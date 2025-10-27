const STORAGE_KEY = "app-theme";

export type ThemeChoice = "light" | "dark" | "system";

export function getStoredTheme(): ThemeChoice {
    // Validate stored value; default to "light" when missing or invalid.
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") {
        return raw;
    }
    return "light";
}

export function applyTheme(theme: ThemeChoice) {
    localStorage.setItem(STORAGE_KEY, theme);
    let appliedTheme = theme;
    if (theme === "system") {
        appliedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", appliedTheme);
    document.documentElement.classList.remove("light", "dark");
    if (appliedTheme === "light" || appliedTheme === "dark") {
        document.documentElement.classList.add(appliedTheme);
    }
    console.log(`Applied theme: ${theme}`);
    document.documentElement.classList.add(theme);
    console.log(`Applied theme: ${theme}`);
}

/** Initialise theme on app boot. */
export function initTheme(): void {
    // Ensure a validated theme is always applied on startup (defaults to "light").
    const stored = getStoredTheme();
    applyTheme(stored);
}

export default {
    getStoredTheme,
    applyTheme,
    initTheme,
};