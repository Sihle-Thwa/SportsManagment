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
import { useState } from "react";
import { House } from "lucide-react";

interface AppSideBarProps {
	currentPath: string;
}

export function AppSideBar({ currentPath }: AppSideBarProps) {
	const [activeRoute, setActiveRoute] = useState(currentPath);

	return (
		<Sidebar
			collapsible="icon"
			className="sidebar"
		>
			<SidebarHeader className="sidebar-header">
				<SidebarMenuButton className="sidebar-menu-button">
					<div className="icon-base ">
						<House />
					</div>
					<h5>U-Organise</h5>
				</SidebarMenuButton>
			</SidebarHeader >
			<SidebarContent className="sidebar-content">
				<NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
				<NavSecondary />
			</SidebarContent>
			<SidebarFooter className="sidebar-footer">
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar >
	);
}

export default AppSideBar;
