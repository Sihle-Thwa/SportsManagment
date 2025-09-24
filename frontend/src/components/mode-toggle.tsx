import { Sun, Moon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "./use-theme";
import "../styles/components/modetoggle.css";

export function ModeToggle() {
	const { theme, setTheme } = useTheme(); // expects {theme, setTheme}
	const isDark = theme === "dark";
	const isSystem = theme === "system";
	const label = isSystem ? "System" : isDark ? "Dark" : "Light";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="mode-toggle__button" aria-label={`Theme: ${label}`}>
					{isDark ? (
						<Moon className="mode-toggle__icon" />
					) : (
						<Sun className="mode-toggle__icon" />
					)}
					<span className="mode-toggle__label">{label}</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mode-toggle__menu">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun className="mode-toggle__menu-icon" /> Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon className="mode-toggle__menu-icon" /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						aria-hidden
						focusable="false"
						className="mode-toggle__menu-icon"
					>
						<path
							d="M12 3v18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ModeToggle;
