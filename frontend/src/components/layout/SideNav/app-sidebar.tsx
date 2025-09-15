// app-sidebar.tsx
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "../../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useEffect, useState } from "react";
import { House } from "lucide-react";
import { useSidebar } from "../../ui/sidebar-context";

interface AppSideBarProps {
	currentPath: string;
}

export function AppSideBar({ currentPath }: AppSideBarProps) {
	const [activeRoute, setActiveRoute] = useState(currentPath);
	const sidebar = useSidebar();
	const isCollapsed = sidebar?.isCollapsed ?? false;

	// Update active route when current path changes
	useEffect(() => {
		setActiveRoute(currentPath);
	}, [currentPath]);

	return (
		<Sidebar
			collapsible="icon"
			className={`sidebar ${
				isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
			}`}
		>
			<SidebarHeader className="sidebar-header">
				<SidebarMenuButton
					className="sidebar-menu-button sidebar-brand"
					size="lg"
				>
					<House
						className={`sidebar-brand-icon ${
							isCollapsed ? "sidebar-brand-icon-collapsed" : ""
						}`}
						size={24}
					/>
					{!isCollapsed && <h5 className="sidebar-brand-text">U-Organise</h5>}
				</SidebarMenuButton>
			</SidebarHeader>

			<SidebarContent className="sidebar-content">
				<NavMain
					activeRoute={activeRoute}
					setActiveRoute={setActiveRoute}
					collapsed={isCollapsed}
				/>
				<NavSecondary collapsed={isCollapsed} />
			</SidebarContent>

			<SidebarFooter className="sidebar-footer">
				<NavUser collapsed={isCollapsed} />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

export default AppSideBar;
