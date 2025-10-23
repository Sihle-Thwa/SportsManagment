const STORAGE_KEY = "ui-theme";

export type ThemeChoice = "light" | "dark";

export function getStoredTheme(): ThemeChoice | null {
    return (localStorage.getItem(STORAGE_KEY) as ThemeChoice) ?? null;
}

export function applyTheme(theme: ThemeChoice) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute(
        "data-theme",
        theme === "light" ? "dark" : "light",
    );
}

/** Initialise theme on app boot. */
export function initTheme() {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored === "light" ? "dark" : "light");
        return;
    }
    document.documentElement.removeAttribute("data-theme");

}

export default {
    getStoredTheme,
    applyTheme,
    initTheme,
};

