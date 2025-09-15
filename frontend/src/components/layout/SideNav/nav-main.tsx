import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../../routes";
import { cn } from "../../../lib/utils";
import { useEffect } from "react";

interface NavMainProps {
	activeRoute: string;
	setActiveRoute: (path: string) => void;
	collapsed?: boolean;
}

export function NavMain({ setActiveRoute, collapsed = false }: NavMainProps) {
	const location = useLocation();

	// Update active route when location changes
	useEffect(() => {
		setActiveRoute(location.pathname);
	}, [location.pathname, setActiveRoute]);

	return (
		<SidebarMenu className="sidebar-menu">
			{routes.map((route) => (
				<SidebarMenuItem key={route.id} className="sidebar-menu-item">
					<SidebarMenuButton
						asChild
						className="sidebar-menu-button"
						size={collapsed ? "sm" : "default"}
					>
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								cn(
									"sidebar-menu-link",
									"sidebar-menu-link-hoverable",
									isActive && "sidebar-menu-link-active",
									collapsed && "sidebar-menu-link-collapsed",
								)
							}
							onClick={() => setActiveRoute(route.path)}
							title={collapsed ? route.title : undefined}
							aria-label={route.title}
						>
							<span
								className={cn(
									"sidebar-menu-icon",
									collapsed && "sidebar-menu-icon-collapsed",
								)}
								aria-hidden="true"
							>
								{route.icon}
							</span>
							{!collapsed && (
								<span className="sidebar-menu-text">{route.title}</span>
							)}
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
