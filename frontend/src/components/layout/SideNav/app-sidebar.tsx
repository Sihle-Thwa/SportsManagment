// src/components/layout/SideNav/app-sidebar.tsx
"use client";

import {
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "../../ui/sidebar";
import { House } from "lucide-react";
import { useSidebar } from "../../ui/sidebar-context";
import "./app-sidebar.css";
import NavMain from "./nav-main";
import NavSecondary from "./nav-secondary";
import NavUser from "./nav-user";

export function AppSideBar() {
	const { isCollapsed } = useSidebar();

	return (
		<div
			id="app_sidebar"
			className={[
				"app_sidebar",
				"sidebar",
				isCollapsed ? "sidebar-collapsed" : "sidebar-expanded",
			].join(" ")}
			aria-label="Primary navigation"
			aria-expanded={!isCollapsed}
		>
			<div className="app_sidebar__inner">
				<SidebarHeader className="sidebar-header">
					<SidebarMenuButton className="sidebar-brand" aria-label="Go to home">
						<House
							className={[
								"sidebar-brand-icon",
								isCollapsed && "sidebar-brand-icon-collapsed",
							].join(" ")}
						/>
						{!isCollapsed && (
							<div className="sidebar-brand-text">U-Organise</div>
						)}
					</SidebarMenuButton>
				</SidebarHeader>

				<SidebarContent className="sidebar_content">
					<NavMain collapsed={isCollapsed} />
					<NavSecondary collapsed={isCollapsed} />
				</SidebarContent>

				<SidebarFooter className="sidebar_footer">
					<NavUser collapsed={isCollapsed} />
				</SidebarFooter>

				<SidebarRail />
			</div>
		</div>
	);
}

export default AppSideBar;
