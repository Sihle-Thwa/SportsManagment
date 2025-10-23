const STORAGE_KEY = "ui-theme"; // same key you referenced earlier

export function getStoredTheme(): "light" | "dark" | "system" | null {
    return localStorage.getItem(STORAGE_KEY) as "light" | "dark" | "system" | null;
}

export function applyTheme(theme: "light" | "dark" | "system") {
    if (theme === "system") {
        localStorage.removeItem(STORAGE_KEY);
        document.documentElement.removeAttribute("data-theme");
        return;
    }
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
}

export function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored === "dark" ? "dark" : "light");
        return;
    }
    document.documentElement.removeAttribute("data-theme");
}
