import { useLocation } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

export function MainLayout() {
	const location = useLocation();

	return (
		<SidebarProvider>
			<div className="main-container" id="app-shell">
				{/* Left rail */}
				<aside className="app-sidebar" aria-label="Primary">
					<AppSideBar currentPath={location.pathname} />
				</aside>

				{/* Top bar */}
				<header className="app-topbar" role="banner">
					<AppTopBar />
				</header>

				{/* Routed content */}
				<main
					className="app-content"
					role="main"
					id="main-content"
					tabIndex={-1}
				>
					<Outlet />
				</main>
			</div>
		</SidebarProvider>
	);
}

export default MainLayout;
