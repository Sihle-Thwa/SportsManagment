import { useLocation } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSideBar from "./SideNav/app-sidebar";
import "../../styles/global.css"; // Import your custom global CSS

/**
 * MainLayout component serves as the primary layout for the application.
 * It includes a sidebar and a top navigation bar, with a main content area
 * that renders child routes using React Router's Outlet.
 */
export function MainLayout() {
	const location = useLocation();

	return (
		<SidebarProvider>
			<div className="flex h-screen w-full bg-background">
				<AppSideBar currentPath={location.pathname} />
				<div className="flex flex-col flex-1 min-h-0">
					<AppTopBar />
					<main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-muted">
						<Outlet />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

export default MainLayout;
