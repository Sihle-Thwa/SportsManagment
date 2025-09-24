import { NavLink, useLocation } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem } from "../../ui/sidebar";
import { cn } from "../../../lib/utils";
import { routes } from "../../../routes/index"; // keep your existing route source
import "./nav-main.css";

export interface NavMainProps {
	collapsed?: boolean;
}

export default function NavMain({ collapsed = false }: NavMainProps) {
	const location = useLocation();

	return (
		<nav
			className={cn("nav-main", collapsed && "is-collapsed")}
			aria-label="Primary"
		>
			<SidebarMenu className="nav-main__menu">
				{routes.map(
					(route: {
						id: string;
						path: string;
						title: string;
						icon: React.ReactNode | undefined;
					}) => {
						const isActive = location.pathname === route.path;
						return (
							<SidebarMenuItem key={route.id} className="nav-main__item">
								<NavLink
									to={route.path}
									className={({ isActive }) =>
										cn(
											"nav-main__link ",
											isActive && "is-active",
											collapsed && "is-collapsed",
										)
									}
									title={collapsed ? route.title : undefined}
									aria-label={route.title}
									aria-current={isActive ? "page" : undefined}
								>
									<span
										className={cn("nav-main__icon", collapsed && "")}
										aria-hidden
									>
										{route.icon}
									</span>
									{!collapsed && (
										<span className="nav-main__label">{route.title}</span>
									)}
								</NavLink>
							</SidebarMenuItem>
						);
					},
				)}
			</SidebarMenu>
		</nav>
	);
}
