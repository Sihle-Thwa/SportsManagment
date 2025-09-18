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
			<SidebarMenu className="nav-main__menu sidebar-menu">
				{routes.map(
					(route: {
						id: string;
						path: string;
						title: string;
						icon: React.ReactNode | undefined;
					}) => {
						const isActive = location.pathname === route.path;
						return (
							<SidebarMenuItem
								key={route.id}
								className="nav-main__item sidebar-menu-item"
							>
								<NavLink
									to={route.path}
									className={({ isActive }) =>
										cn(
											"nav-main__link sidebar-menu-link",
											isActive && "is-active",
											collapsed && "is-collapsed",
										)
									}
									title={collapsed ? route.title : undefined}
									aria-label={route.title}
									aria-current={isActive ? "page" : undefined}
								>
									<span
										className={cn(
											"nav-main__icon sidebar-menu-icon",
											collapsed && "sidebar-menu-icon-collapsed",
										)}
										aria-hidden
									>
										{route.icon ? (
											route.icon
										) : (
											<span className="sidebar-menu-icon-placeholder" />
										)}
									</span>
									{!collapsed && (
										<span className="nav-main__labels">
											<span className="nav-main__label sidebar-menu-text">
												{route.title}
											</span>
										</span>
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
