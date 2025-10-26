import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProviderContext, Theme } from "./theme-context";

export const useTheme = () => {
    const ctx = useContext(ThemeProviderContext);

    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProviderContext");
    }

    const { theme, setTheme } = ctx;

    // Helper to determine actual theme when 'system' selected
    const getSystemPreference = useCallback((): "light" | "dark" | "system" => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return "light";
        }
        return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }, []);

    const [resolved, setResolved] = useState<"light" | "dark" | "system">(
        () => (theme === "system" ? getSystemPreference() : (theme as "light" | "dark")),
    );

    useEffect(() => {
        // Update resolved when the declared theme changes
        if (theme === "system") {
            setResolved(getSystemPreference());
        } else {
            setResolved(theme as "light" | "dark");
        }
    }, [theme, getSystemPreference]);

    useEffect(() => {
        // Listen to system preference changes only when theme === 'system'
        if (typeof window === "undefined" || !window.matchMedia) return;

        const mq = window.matchMedia("(prefers-color-scheme: light)");

        const handler = (e: MediaQueryListEvent) => {
            if (theme === "system") {
                setResolved(e.matches ? "light" : "dark");
            }
        };

        // addEventListener preferred, fallback to addListener for older browsers
        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", handler);
        } else {
            // fallback for older browsers -- cast to any to avoid TS errors
            (mq as unknown as MediaQueryList).addListener(handler);

            return () => {
                if (typeof mq.removeEventListener === "function") {
                    mq.removeEventListener("change", handler);
                } else {
                    // fallback for older browsers -- cast to any to avoid TS errors
                    (mq as unknown as MediaQueryList).removeListener(handler);
                }
            };
        }
    }, [theme]);

    // Cycle order: light -> dark -> system -> light
    const cycleTheme = useCallback(() => {
        const order: Theme[] = ["light", "dark", "system"];
        const idx = order.indexOf(theme);
        const next = order[(idx + 1) % order.length];
        setTheme(next);
    }, [theme, setTheme]);

    return useMemo(
        () => ({
            theme,
            setTheme,
            resolvedTheme: resolved,
            cycleTheme,
        }),
        [theme, setTheme, resolved, cycleTheme],
    );
};
