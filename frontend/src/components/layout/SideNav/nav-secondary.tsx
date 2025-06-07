import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { lazy, Suspense } from "react";
import { cn } from "../../../lib/utils";

const HandHelping = lazy(() =>
	import("lucide-react").then((module) => ({ default: module.HandHelping }))
);
const Settings = lazy(() =>
	import("lucide-react").then((module) => ({ default: module.Settings }))
);

const items = [
	{
		title: "Support",
		url: "#",
		icon: HandHelping,
		ariaLabel: "Get help and support",
	},
	{
		title: "Settings",
		url: "#",
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
				<SidebarMenuItem
					className="sidebar-menu-item"
					key={item.title}
				>
					<SidebarMenuButton className="sidebar-menu-button" asChild>
						<a
							href={item.url}
							className={cn(
								"sidebar-menu-link sidebar-menu-link-secondary",
								collapsed && "sidebar-menu-link-collapsed"
							)}
							title={collapsed ? item.title : undefined}
							aria-label={item.ariaLabel}
						>
							<Suspense fallback={
								<span
									className="sidebar-menu-icon-placeholder"
									aria-hidden="true"
								/>
							}>
								<item.icon
									className="sidebar-menu-icon"
									aria-hidden="true"
								/>
							</Suspense>
							{!collapsed && (
								<span className="sidebar-menu-text">
									{item.title}
								</span>
							)}
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}