// MainLayout.tsx
import { useLocation, Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { useSidebar } from "../ui/sidebar-context";
import { SidebarProvider } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

function Shell() {
	const location = useLocation();
	const sidebar = useSidebar();

	// Simplified state logic
	const isCollapsed = sidebar?.isCollapsed ?? false;

	return (
		<div
			className={`main-container ${
				isCollapsed ? "is-collapsed" : "is-expanded"
			}`}
			id="app-shell"
			data-sidebar-collapsed={isCollapsed}
		>
			{/* Skip to main content for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:no-underline focus:shadow-lg"
			>
				Skip to main content
			</a>

			{/* Sidebar */}
			<aside
				id="app-sidebar"
				className="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={!isCollapsed}
			>
				<AppSideBar currentPath={location.pathname} />
			</aside>

			{/* Top Navigation Bar */}
			<header className="app-topbar" role="banner">
				<AppTopBar />
			</header>

			{/* Main Content Area */}
			<main
				className="app-content"
				id="main-content"
				role="main"
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
