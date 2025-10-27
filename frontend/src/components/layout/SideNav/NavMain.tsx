"use client";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem } from "../../ui/sidebar";
import "./navmain.css";
import { routes } from "../../../routes";

export interface NavMainProps {
	collapsed?: boolean;
}

export default function NavMain({ collapsed = false }: NavMainProps) {
	const location = useLocation();

	return (
		<nav className="navMainRoot" aria-label="Primary">
			<SidebarMenu className="navMainMenu">
				{routes.map((route) => {
					const match = location.pathname === route.path;
					return (
						<SidebarMenuItem key={route.id} className="navMainItem">
							<NavLink
								to={route.path}
								className="navMainLink" 
								title={collapsed ? route.title : undefined}
								aria-label={route.title}
								aria-current={match ? "page" : undefined}
							>
								<span className="navMainLinkIcon" aria-hidden>
									{route.icon}
								</span>
								{!collapsed && (
									<span className="navMainLinkLabel">{route.title}</span>
								)}
							</NavLink>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</nav>
	);
}
