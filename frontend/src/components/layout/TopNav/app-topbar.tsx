"use client";

import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSidebar } from "../../ui/sidebar-context";
import SearchInput from "./search-input";
import ModeToggle from "../../mode-toggle";
import "./apptopbar.css";
import { useLocation } from "react-router-dom";

export default function AppTopBar() {
	const { toggleSidebar, isCollapsed } = useSidebar();
	const location = useLocation();
	const pathname = location.pathname;

	// local UI state to animate button (the sidebar provider also ultimately controls layout)
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
			{/* LEFT: Brand/Home + menu toggle + page title (Header) */}
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

				{/* inline header (page title / breadcrumb) */}
				<div className="topbar-header">
					<div className="topbar-header__title" title={pathname ?? "/"}>
						{/* lightweight title from pathname; for richer header use app-header */}
						{pathname
							.split("/")
							.filter(Boolean)
							.map(
								(segment) => segment.charAt(0).toUpperCase() + segment.slice(1),
							)}
					</div>
				</div>
			</div>

			{/* CENTER: search (hidden on small screens) */}
			<div className="topbar-section topbar-center" aria-label="Site search">
				<SearchInput />
			</div>

			{/* RIGHT: controls */}
			<div className="topbar-section topbar-right">
				<ModeToggle />
			</div>
		</div>
	);
}
