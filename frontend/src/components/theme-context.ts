import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const initialState: ThemeProviderState = {
    theme: "light",
    setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
