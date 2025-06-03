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
			className="sidebar sidebar-primary  flex flex-col"
			data-testid="app-sidebar"
		>
			<SidebarHeader className="sidebar-header flex flex-row items-center justify-center p-4">
				<SidebarMenuButton
					size="lg"
					className="flex flex-row items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<div className="flex items-center justify-center">
						<House className="w-6 h-6 text-primary" />
					</div>
					<span className="font-semibold text-lg text-primary">U-Organise</span>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent className="flex flex-col gap-2 px-2">
				<NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
				<NavSecondary />
			</SidebarContent>
			<SidebarFooter className="mt-auto flex items-center justify-center p-4">
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export default AppSideBar;
