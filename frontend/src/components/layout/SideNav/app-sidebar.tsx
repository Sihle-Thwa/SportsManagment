// app-sidebar.tsx
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "../../ui/sidebar"; // <-- fixed path
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
		<Sidebar collapsible="icon" className="sidebar">
			<SidebarHeader className="sidebar-header">
				<SidebarMenuButton className="sidebar-menu-button sidebar-brand">
					<House />
					<h5 className="sidebar-brand-text">U-Organise</h5>
				</SidebarMenuButton>
			</SidebarHeader>

			<SidebarContent className="sidebar-content">
				<NavMain
					activeRoute={activeRoute}
					setActiveRoute={setActiveRoute}
					collapsed={false} // or undefined, depending on your component's needs
				/>
				<NavSecondary collapsed={false} />
			</SidebarContent>

			<SidebarFooter className="sidebar-footer">
				<NavUser collapsed={false} />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

export default AppSideBar;
