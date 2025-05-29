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
		<SidebarMenu className="flex flex-col gap-2 self-stretch items-start justify-center p-4">
			{routes.map((route) => (
				<SidebarMenuItem
					key={route.id}
					className="flex items-center w-full"
				>
					<SidebarMenuButton asChild className="w-full px-4 py-2">
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								[
									"flex items-center gap-3 rounded-lg transition-colors duration-150",
									isActive || activeRoute === route.path
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
									"custom-sidenav-link", // Example: add your custom class from global.css
								].join(" ")
							}
							onClick={() => setActiveRoute(route.path)}
						>
							{route.icon}
							<span className="truncate">{route.title}</span>
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
