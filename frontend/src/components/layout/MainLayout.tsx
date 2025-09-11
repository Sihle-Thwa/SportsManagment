// MainLayout.tsx
import { useLocation, Outlet } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
// ⬇️ unify these imports — SAME FILE for provider + hook
import { useSidebar } from "../ui/sidebar-context";
import { SidebarProvider } from "../ui/sidebar-context";
import AppSideBar from "./SideNav/app-sidebar";
import "./mainlayout.css";

function Shell() {
	const location = useLocation();
	const sidebar = useSidebar(); // now inside the SAME provider
	const isCollapsed = !!(sidebar?.isCollapsed ?? sidebar?.isCollapsed ?? false);

	const containerClass = `main-container ${
		isCollapsed ? "is-collapsed" : "is-expanded"
	}`;

	return (
		<div
			className={containerClass}
			id="app-shell"
			data-sidebar-collapsed={isCollapsed ? "true" : "false"}
		>
			<a href="#main-content" className="sr-only focus:not-sr-only">
				Skip to main content
			</a>

			<aside
				id="app-sidebar"
				className="app-sidebar"
				aria-label="Primary navigation"
				aria-expanded={!isCollapsed}
			>
				<AppSideBar currentPath={location.pathname} />
			</aside>

			<header className="app-topbar">
				<AppTopBar />
			</header>

			<main className="app-content" id="main-content" tabIndex={-1} role="main">
				<Outlet />
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
