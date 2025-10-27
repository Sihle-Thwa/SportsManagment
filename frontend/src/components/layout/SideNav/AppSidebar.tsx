"use client";

import { House } from "lucide-react";
import {
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from "../../ui/sidebar";
import { useSidebar } from "../../ui/sidebar-context";
import NavMain from "./NavMain";
import NavSecondary from "./NavSecondary";
import NavUser from "./NavUser";
import "./appsidebar.css";

export function AppSidebar()  {
	const { isCollapsed } = useSidebar();

	return (
		<aside
			id="appsidebar"
			className="appSidebar"
			aria-label="Primary navigation"
			aria-expanded={!isCollapsed}
		>
			<div className="appSidebarInner">
				<SidebarHeader className="appSidebarHeader">
					<button
						className="appSidebarBrand"
						aria-label="Go to home"
						title="Home"
						type="button"
					>
						<House className="appSidebarBrandIcon" aria-hidden />
						{!isCollapsed && (
							<span className="appSidebarBrandText">U-Organise</span>
						)}
					</button>
				</SidebarHeader>

				<SidebarContent className="appSidebarContent">
					<NavMain collapsed={isCollapsed} />
					<NavSecondary collapsed={isCollapsed} />
				</SidebarContent>

				<SidebarFooter className="appSidebarFooter">
					<NavUser collapsed={isCollapsed} />
				</SidebarFooter>

				<SidebarRail className="appSidebarRail" />
			</div>
		</aside>
	);
}

export default AppSidebar;
