import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

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
			<aside
				id="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={isExpanded}
			>
				<AppSideBar />
			</aside>

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
