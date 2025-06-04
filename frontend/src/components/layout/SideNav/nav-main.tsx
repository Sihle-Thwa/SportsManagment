import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { NavLink } from "react-router-dom";
import { routes } from "../../../routes";

interface NavMainProps {
	activeRoute: string;
	setActiveRoute: (path: string) => void;
}

export function NavMain({ activeRoute, setActiveRoute }: NavMainProps) {
	return (
		<SidebarMenu className="sidebar-menu-">
			{routes.map((route) => (
				<SidebarMenuItem
					key={route.id}
					className="sidebar-menu-item"
				>
					<SidebarMenuButton asChild className="sidebar-menu-button">
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								[
									"sidebar-menu-item",
									isActive || activeRoute === route.path
										? "text-accent-foreground bg-accent"
										: "text-muted-foreground",
									"", // Example: add your custom class from global.css
								].join(" ")
							}
							onClick={() => setActiveRoute(route.path)}
						>
							{route.icon}
							<span >{route.title}</span>
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
