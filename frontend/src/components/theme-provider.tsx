import { useEffect, useState } from "react";
import { ThemeProviderContext } from "./theme-context";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "app-theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark", "system");

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
