import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { NavLink } from "react-router-dom";
import { routes } from "../../../routes";

import { clsx } from "clsx";


interface NavMainProps {
	activeRoute: string;
	setActiveRoute: (path: string) => void;
}

export function NavMain({ setActiveRoute }: NavMainProps) {
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
								clsx(
									"sidebar-menu-item sidebar-menu-item-custom",
									isActive ? "sidebar-menu-item-active" : "sidebar-menu-item-disabled"
								)
							}
							onClick={() => setActiveRoute(route.path)}
						>
							{route.icon}
							<span className="sidebar-menu-item">{route.title}</span>
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
