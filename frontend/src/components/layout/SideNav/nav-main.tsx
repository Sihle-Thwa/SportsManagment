import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { NavLink } from "react-router-dom";
import { routes } from "../../../routes";
import { cn } from "../../../lib/utils";

interface NavMainProps {
	activeRoute: string;
	setActiveRoute: (path: string) => void;
	collapsed?: boolean;
}

export function NavMain({ setActiveRoute, collapsed = false }: NavMainProps) {
	return (
		<SidebarMenu className="sidebar-menu">
			{routes.map((route) => (
				<SidebarMenuItem
					key={route.id}
					className="sidebar-menu-item"
				>
					<SidebarMenuButton asChild className="sidebar-menu-button">
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								cn(
									"sidebar-menu-link",
									"sidebar-menu-link-hoverable", // Explicit hover class
									isActive && "sidebar-menu-link-active",
									collapsed && "sidebar-menu-link-collapsed"
								)
							}
							onClick={() => setActiveRoute(route.path)}
							title={collapsed ? route.title : undefined}
							aria-label={route.title}
						>
							<span className="sidebar-menu-icon" aria-hidden="true">
								{route.icon}
							</span>
							{!collapsed && (
								<span className="sidebar-menu-text">
									{route.title}
								</span>
							)}
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}