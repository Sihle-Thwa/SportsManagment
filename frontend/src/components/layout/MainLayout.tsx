import {} from "react";
import AppSideBar from "@/components/layout/SideNav/app-sidebar";
import AppTopBar from "@/components/layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import bgGradient from "../../assets/images/bodyGradient.png";
import "../../styles/index.css";
export function MainLayout() {
	return (
		<SidebarProvider>
			<AppSideBar currentPath={window.location.pathname} />
			<SidebarInset>
				{/* Main Content Area */}
				<div className={`flex flex-col h-screen`}>
					{<AppTopBar />}

					<main
						className="p-5 flex-1 overflow-y-auto"
						style={{
							backgroundImage: `url(${bgGradient})`,
							backgroundSize: "cover",
						}}
					>
						<Outlet /> {/* This will render the matched child route */}
					</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
export default MainLayout;
