import { Moon, Sun, Laptop } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "../components/use-theme";
import { useEffect, useState } from "react";
import { getStoredTheme, initTheme } from "../lib/theme";

export function ModeToggle() {
	const { setTheme } = useTheme();
	// track current for icon + immediate UI feedback
	const [current, setCurrent] = useState<
		"light" | "dark" | "system" | undefined
	>();

	useEffect(() => {
		initTheme();

		const stored = getStoredTheme();

		if (stored) {
			setTheme(stored);
		} else {
			// No stored theme: set "system" as the default
			setTheme("system");
			setCurrent("system");
		}
	}, [setTheme]);

	// helper to update both theme provider and local state
	const apply = (t: "light" | "dark" | "system") => {
		setTheme(t);
		setCurrent(t);
	};
	// sync current with theme changes
	useEffect(() => {
		const stored = getStoredTheme();
		if (stored) {
			setCurrent(stored);
		} else {
			setCurrent("system");
		}
	}, [setCurrent]);

	// early return to avoid hydration mismatch
	if (!current) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					aria-label="Toggle theme"
					className="mode-toggle__button"
				>
					{current === "dark" && <Moon className="mode-toggle__icon_Moon" />}
					{current === "light" && <Sun className="mode-toggle__icon_Sun" />}
					{current === "system" && (
						<Laptop className="mode-toggle__icon_Laptop" />
					)}
					<span className="sr-only">Toggle theme</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mode-toggle__menuContent">
				<DropdownMenuItem onClick={() => apply("system")}>
					<div className="mr-2">
						<Laptop className="mode-toggle__icon_Laptop" />
					</div>
					System
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => apply("light")}>
					<div className="mr-2">
						<Sun className="mode-toggle__icon_Sun" />
					</div>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => apply("dark")}>
					<div className="mr-2">
						<Moon className="mode-toggle__icon_Moon" />
					</div>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ModeToggle;
