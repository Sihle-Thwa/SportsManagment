import * as React from "react";
import { NavLink } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem } from "../../ui/sidebar";
import { cn } from "../../../lib/utils";
import "./nav-secondary.css";
import { HelpCircle, Settings } from "lucide-react";

export interface SecondaryItem {
	id: string;
	title: string;
	path: string;
	icon: React.ElementType | null;
}

const SECONDARY: SecondaryItem[] = [
	{ id: "settings", title: "Settings", path: "/settings", icon: Settings },
	{ id: "help", title: "Help", path: "/help", icon: HelpCircle },
];

export default function NavSecondary({
	collapsed = false,
}: {
	collapsed?: boolean;
}) {
	return (
		<nav
			className={cn("nav-secondary", collapsed && "is-collapsed")}
			aria-label="Secondary"
		>
			<SidebarMenu className="nav-secondary__menu sidebar-menu sidebar-menu-secondary">
				{SECONDARY.map((item) => {
					const Icon = item.icon;
					return (
						<SidebarMenuItem
							key={item.id}
							className="nav-secondary__item sidebar-menu-item"
						>
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									cn(
										"nav-secondary__link sidebar-menu-link sidebar-menu-link-secondary",
										isActive && "is-active",
										collapsed && "is-collapsed",
									)
								}
								title={collapsed ? item.title : undefined}
								aria-label={item.title}
							>
								<span
									className={cn(
										"nav-secondary__icon sidebar-menu-icon",
										collapsed && "sidebar-menu-icon-collapsed",
									)}
									aria-hidden
								>
									{Icon ? (
										<Icon size={16} />
									) : (
										<span className="sidebar-menu-icon-placeholder" />
									)}
								</span>
								{!collapsed && (
									<span className="nav-secondary__label sidebar-menu-text">
										{item.title}
									</span>
								)}
							</NavLink>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</nav>
	);
}
