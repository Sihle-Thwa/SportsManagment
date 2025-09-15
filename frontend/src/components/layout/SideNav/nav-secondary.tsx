import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { HandHelping, Settings } from "lucide-react";
import { cn } from "../../../lib/utils";

const items = [
	{
		title: "Support",
		url: "/support",
		icon: HandHelping,
		ariaLabel: "Get help and support",
	},
	{
		title: "Settings",
		url: "/settings",
		icon: Settings,
		ariaLabel: "App settings and preferences",
	},
];

interface NavSecondaryProps {
	collapsed?: boolean;
}

export function NavSecondary({ collapsed = false }: NavSecondaryProps) {
	return (
		<SidebarMenu className="sidebar-menu sidebar-menu-secondary">
			{items.map((item) => (
				<SidebarMenuItem className="sidebar-menu-item" key={item.title}>
					<SidebarMenuButton
						className="sidebar-menu-button"
						asChild
						size={collapsed ? "sm" : "default"}
					>
						<a
							href={item.url}
							className={cn(
								"sidebar-menu-link sidebar-menu-link-secondary",
								"sidebar-menu-link-hoverable",
								collapsed && "sidebar-menu-link-collapsed",
							)}
							title={collapsed ? item.title : undefined}
							aria-label={item.ariaLabel}
						>
							<item.icon
								className={cn(
									"sidebar-menu-icon",
									collapsed && "sidebar-menu-icon-collapsed",
								)}
								aria-hidden="true"
								size={16}
							/>
							{!collapsed && (
								<span className="sidebar-menu-text">{item.title}</span>
							)}
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
