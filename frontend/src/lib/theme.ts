const STORAGE_KEY = "ui-theme";

export type ThemeChoice = "light" | "dark" | "system";

export function getStoredTheme(): ThemeChoice | null {
    return (localStorage.getItem(STORAGE_KEY) as ThemeChoice) ?? null;
}

export function applyTheme(theme: ThemeChoice) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute(
        "data-theme",
        theme === "system" ? "light" : "dark",
    );
}

/** Initialise theme on app boot. */
export function initTheme(): void {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark" || stored === "system") {
        document.documentElement.setAttribute("data-theme", stored === "light" ? "dark" : "light");
        applyTheme(stored);
        return;
    }
    document.documentElement.removeAttribute("data-theme");
}

export default {
    getStoredTheme,
    applyTheme,
    initTheme,
};

