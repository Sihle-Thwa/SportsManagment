// app-sidebar.tsx
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "../../ui/sidebar";
import { House } from "lucide-react";
import { useSidebar } from "../../ui/sidebar-context";
import "./app-sidebar.css";
import "./sidebar.css";
import NavMain from "./nav-main";
import NavSecondary from "./nav-secondary";
import NavUser from "./nav-user";

export function AppSideBar() {
	const { isCollapsed } = useSidebar();

	return (
		<aside
			id="app-sidebar"
			className={[
				"app-sidebar", // component namespace
				"sidebar", // base block
				isCollapsed ? "sidebar-collapsed" : "sidebar-expanded",
			].join(" ")}
			aria-label="Primary navigation"
			aria-expanded={!isCollapsed}
		>
			<Sidebar collapsible="icon" className="app-sidebar__inner">
				<SidebarHeader className="sidebar-header">
					<SidebarMenuButton className="sidebar-brand">
						<House
							className={[
								"sidebar-brand-icon",
								isCollapsed && "sidebar-brand-icon-collapsed",
							].join(" ")}
						/>
						{!isCollapsed && <h5 className="sidebar-brand-text">U-Organise</h5>}
					</SidebarMenuButton>
				</SidebarHeader>

				<SidebarContent className="sidebar-content">
					<NavMain collapsed={isCollapsed} />
					<NavSecondary collapsed={isCollapsed} />
				</SidebarContent>

				<SidebarFooter className="sidebar-footer">
					<NavUser collapsed={isCollapsed} />
				</SidebarFooter>

				<SidebarRail />
			</Sidebar>
		</aside>
	);
}

export default AppSideBar;
