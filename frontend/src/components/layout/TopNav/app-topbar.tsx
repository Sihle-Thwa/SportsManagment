"use client";

import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSidebar } from "../../ui/sidebar-context";
import SearchInput from "./search-input";
import "./apptopbar.css";
import { useLocation } from "react-router-dom";

export default function AppTopBar() {
	const { toggleSidebar, isCollapsed } = useSidebar();
	const location = useLocation();
	const pathname = location.pathname;

	const [menuOpen, setMenuOpen] = React.useState<boolean>(!isCollapsed);

	React.useEffect(() => {
		// Keep the local icon state in sync when provider changes
		setMenuOpen(!isCollapsed);
	}, [isCollapsed]);

	const handleToggle = () => {
		toggleSidebar();
		setMenuOpen((s) => !s);
	};

	return (
		<div className="app-topbar-inner" role="region" aria-label="Top navigation">
			<div className="topbar-section topbar-left">
				<div className="topbar-brand-group">
					<button
						type="button"
						aria-label={menuOpen ? "Close sidebar" : "Open sidebar"}
						aria-pressed={menuOpen}
						className="topbar-toggle"
						onClick={handleToggle}
					>
						{menuOpen ? (
							<ArrowLeftIcon className="topbar-toggle__icon" />
						) : (
							<ArrowRightIcon className="topbar-toggle__icon" />
						)}
					</button>
				</div>

				<div className="topbar-header">
					<div className="topbar-header__title" title={pathname ?? "/"}>
						{pathname
							.split("/")
							.filter(Boolean)
							.map(
								(segment) => segment.charAt(0).toUpperCase() + segment.slice(1),
							)}
					</div>
				</div>
			</div>
			<div className="topbar-section topbar-center" aria-label="Site search">
				<SearchInput />
			</div>

			<div className="topbar-section topbar-right">{/* <ModeToggle /> */}</div>
		</div>
	);
}
