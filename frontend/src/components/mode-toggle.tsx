import { Sun, Moon } from "lucide-react";
import { useTheme } from "./use-theme";
import "../styles/components/modetoggle.css";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";
	const isSystem = theme === "system";
	const label = isSystem ? "System" : isDark ? "Dark" : "Light";

	const handleToggle = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<div>
			<div>
				<button
					className="mode-toggle__button"
					aria-label={`Theme: ${label}`}
					onClick={handleToggle}
				>
					{isDark ? (
						<Moon className="mode-toggle__icon" />
					) : (
						<Sun className="mode-toggle__icon" />
					)}
					<span className="mode-toggle__label">{label}</span>
				</button>
			</div>
		</div>
	);
}
export default ModeToggle;
