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

export function ModeToggle({ className }: { className?: string }) {
	const { setTheme } = useTheme();
	// track current for icon + immediate UI feedback
	const [current, setCurrent] = useState<string | null>(null);

	// initialize theme on client
	useEffect(() => {
		initTheme();
		const stored = getStoredTheme() || "system";
		setCurrent(stored);
		if (stored) setTheme(stored);
	}, [setTheme]);

	// helper to update both theme provider and local state
	const apply = (t: "light" | "dark" | "system") => {
		setTheme(t);
		setCurrent(t);
	};

	// pick icon based on current theme
	const ThemeIcon = () => {
		if (current === "dark") return <Moon className="w-5 h-5" />;
		if (current === "light") return <Sun className="w-5 h-5" />;
		return <Laptop className="w-5 h-5" />; // system
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					aria-label="Toggle theme"
					className={
						"inline-flex items-center justify-center p-2 rounded-md transition-colors " +
						"bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 " +
						"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary " +
						"shadow-sm " +
						(className ?? "")
					}
				>
					<ThemeIcon />
					<span className="sr-only">Toggle theme</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="min-w-[9rem]">
				<DropdownMenuItem onClick={() => apply("light")}>
					<span className="mr-2">
						<Sun className="w-4 h-4" />
					</span>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => apply("dark")}>
					<span className="mr-2">
						<Moon className="w-4 h-4" />
					</span>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => apply("system")}>
					<span className="mr-2">
						<Laptop className="w-4 h-4" />
					</span>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ModeToggle;
