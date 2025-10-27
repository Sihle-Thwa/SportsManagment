import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/AppSidebar";
import "./mainlayout.css";
import "../../lib/theme";

function InnerShell() {
	const sidebar = useSidebar();
	const isCollapsed = Boolean(sidebar?.isCollapsed ?? false);

	return (
		<div
			id="app-shell"
			className={`main_container ${
				isCollapsed ? "is-collapsed" : "is-expanded"
			}`}
			data-sidebar-collapsed={isCollapsed ? "true" : "false"}
			aria-hidden="false"
		>
			{/* Sidebar column / off-canvas on mobile */}
			<div
				className="app_sidebar"
				role="complementary"
				aria-label="Primary navigation"
			>
				<AppSideBar />
			</div>

			{/* Topbar */}
			<div className="app_topbar" role="banner">
				<AppTopBar />
			</div>

			{/* Main content */}
			<main id="main_content" className="main_content" role="main">
				<div className="app_content" id="content-wrapper" tabIndex={-1}>
					<Outlet />
				</div>
			</main>

			<div
				className="app_sidebar_overlay"
				aria-hidden={isCollapsed}
				data-overlay-visible={!isCollapsed ? "true" : "false"}
				onClick={() =>
					sidebar?.isCollapsed ? undefined : sidebar?.toggleSidebar()
				}
			/>
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
