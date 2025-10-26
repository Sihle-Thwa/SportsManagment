import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: (_newTheme: Theme) => {
        void _newTheme;
    },
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
