import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";
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
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<House className="h-4 w-4" />
					</div>
					<div className="flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">U-Organise</span>
					</div>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

				<SidebarGroupLabel>Settings</SidebarGroupLabel>

				<NavSecondary />
			</SidebarContent>
			<SidebarFooter className="mt-auto">
				{/* Fix Icon to display center when sidenav bar is 'closed' */}
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
export default AppSideBar;
