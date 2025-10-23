import { Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
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
		>
			<AppSideBar />

			<div className="app_topbar" role="banner">
				<AppTopBar />
				{/* Add any additional elements to the top bar here */}
			</div>

			<main id="main_content" className="app_content" role="main" tabIndex={-1}>
				<div className="content_wrapper">
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
