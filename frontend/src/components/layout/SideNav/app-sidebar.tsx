import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
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
		<Sidebar collapsible="icon" className="h-screen ">
			<SidebarHeader className="flex flex-row items-start justify-center p-4">
				<SidebarMenuButton
					size="lg"
					className="flex flex-row data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-3 "
				>
					<div className="flex flex-row rounded-lg items-center justify-center">
						<House className="h-fit w-fit bg-white" />
					</div>
					<div className="flex flex-row items-center justify-center">
						<span className=" font-semibold">U-Organise</span>
					</div>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

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
