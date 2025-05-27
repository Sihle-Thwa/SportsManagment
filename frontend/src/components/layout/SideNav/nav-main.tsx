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
		<SidebarMenu className="flex flex-col gap-1 self-stretch items-start justify-center p-3">
			{routes.map((route) => (
				<SidebarMenuItem
					key={route.id}
					className="flex flex-row items-start justify-start w-full"
				>
					<SidebarMenuButton asChild className="w-full p-3">
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								`flex flex-row rounded-lg ${
									isActive || activeRoute === route.path
										? "bg-primary text-white"
										: "text-muted-foreground hover:bg-gray-100"
								}`
							}
							onClick={() => setActiveRoute(route.path)}
						>
							{route.icon}
							<span>{route.title}</span>
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
