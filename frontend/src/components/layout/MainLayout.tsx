// MainLayout.tsx
import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

function Shell() {
	// Simplified state logic
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
			{/* Skip to main content for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only"
				aria-label="Skip to main content"
			>
				Skip to main content
			</a>

			{/* Sidebar */}
			<aside
				id="app-sidebar"
				className="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={isExpanded}
			>
				<AppSideBar />
			</aside>

			{/* Top Navigation Bar */}
			<header className="app-topbar" role="banner">
				<AppTopBar />
			</header>

			{/* Main Content Area */}
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
			<Shell />
		</SidebarProvider>
	);
}

export default MainLayout;
