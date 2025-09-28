import * as React from "react";
import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

/**
 * InnerShell uses useSidebar() — must be rendered inside SidebarProvider.
 */
function InnerShell() {
	const sidebar = useSidebar();
	const isCollapsed = Boolean(sidebar?.isCollapsed ?? false);
	const isExpanded = !isCollapsed;

	return (
		<div
			id="app-shell"
			className={`main-container ${
				isCollapsed ? "is-collapsed" : "is-expanded"
			}`}
			data-sidebar-collapsed={isCollapsed ? "true" : "false"}
			aria-hidden="false"
		>
			{/* Sidebar grid column (keeps slot reserved even if internal sidebar uses fixed positioning) */}
			<aside
				id="app-sidebar"
				className="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={isExpanded}
			>
				<AppSideBar />
			</aside>

			{/* Topbar (spans top across the content column) */}
			<header className="app-topbar" role="banner">
				<AppTopBar />
			</header>

			{/* Main content */}
			<main
				id="main-content"
				className="app-content"
				role="main"
				tabIndex={-1}
				aria-label="Main content"
			>
				<div className="content-wrapper">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export function MainLayout() {
	return (
		<SidebarProvider>
			<InnerShell />
		</SidebarProvider>
	);
}

export default MainLayout;
