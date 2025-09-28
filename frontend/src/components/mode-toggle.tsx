"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../components/use-theme";
import "./modetoggle.css";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const label =
		theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

	return (
		<div className="mode-toggle">
			<button
				type="button"
				className="mode-toggle__button"
				aria-label={`Theme: ${label}`}
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				{theme === "dark" ? (
					<Moon className="mode-toggle__icon" />
				) : (
					<Sun className="mode-toggle__icon" />
				)}
			</button>
		</div>
	);
}
