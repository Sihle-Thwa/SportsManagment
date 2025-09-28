import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

/**
 * InnerShell uses useSidebar() (must be rendered inside SidebarProvider).
 * Important: we do NOT wrap <AppSideBar /> in another aside — AppSideBar
 * already renders the sidebar root element (class/id), so duplicating the
 * wrapper created duplicate IDs and CSS targeting issues.
 */
function InnerShell() {
	const sidebar = useSidebar();
	const isCollapsed = Boolean(sidebar?.isCollapsed ?? false);

	return (
		<div
			id="app-shell"
			className={`main-container ${
				isCollapsed ? "is-collapsed" : "is-expanded"
			}`}
			data-sidebar-collapsed={isCollapsed ? "true" : "false"}
		>
			{/* Sidebar component itself renders the element with .app-sidebar */}
			<AppSideBar />

			{/* Topbar — header spans header area of grid */}
			<header className="app-topbar" role="banner">
				<AppTopBar />
			</header>

			{/* Main content area */}
			<main id="main-content" className="app-content" role="main" tabIndex={-1}>
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
