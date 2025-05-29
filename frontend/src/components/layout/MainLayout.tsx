import { useLocation } from "react-router-dom";
import AppTopBar from "../layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSideBar from "./SideNav/app-sidebar";

/**
 * MainLayout component serves as the primary layout for the application.
 * It includes a sidebar and a top navigation bar, with a main content area
 * that renders child routes using React Router's Outlet.
 */
export function MainLayout() {
	const location = useLocation();

	return (
		<SidebarProvider>
			<AppSideBar currentPath={location.pathname} />
			<div className="flex flex-col h-screen">
				<AppTopBar />
				<main className="p-5 flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-100">
					<Outlet />
				</main>
			</div>
		</SidebarProvider>
	);
}

export default MainLayout;
