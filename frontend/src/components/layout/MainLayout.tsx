import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

/**
 * InnerShell uses useSidebar() — it must be rendered inside SidebarProvider.
 * We define it here and render it as a child of SidebarProvider to avoid hook errors.
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
			{/* Accessibility: skip link */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only"
				aria-label="Skip to main content"
			>
				Skip to main content
			</a>

			{/* Sidebar column placeholder (keeps grid alignment even if sidebar uses fixed internals) */}
			<aside
				id="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={isExpanded}
			>
				<AppSideBar />
			</aside>

			{/* Topbar spanning the second column */}
			<div role="banner">
				<AppTopBar />
			</div>

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
