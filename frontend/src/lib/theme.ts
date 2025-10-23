const STORAGE_KEY = "ui-theme";

export type ThemeChoice = "light" | "dark" | "system";

export function getStoredTheme(): ThemeChoice | null {
    return (localStorage.getItem(STORAGE_KEY) as ThemeChoice) ?? null;
}

export function applyTheme(theme: ThemeChoice) {
    if (theme === "system") {
        localStorage.removeItem(STORAGE_KEY);
        // remove explicit attribute so prefers-color-scheme takes effect
        document.documentElement.removeAttribute("data-theme");
        return;
    }
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "system");
}

/** Initialise theme on app boot. */
export function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored === "dark" ? "dark" : "system");
        return;
    }
    document.documentElement.removeAttribute("data-theme");

}

export default {
    getStoredTheme,
    applyTheme,
    initTheme,
};

