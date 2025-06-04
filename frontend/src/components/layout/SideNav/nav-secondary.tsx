import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { lazy, Suspense } from "react";

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
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function NavSecondary() {
	return (
		<SidebarMenu className="sidebar-menu mt-auto">
			{items.map((item) => (
				<SidebarMenuItem
					className="sidebar-menu-item"
					key={item.title}
				>
					<SidebarMenuButton className="sidebar-menu-button" asChild>
						<a
							href={item.url}
							className="sidebar-menu-item"
						>
							<Suspense fallback={<span className="w-5 h-5 animate-pulse" />}>
								<item.icon className="icon-base" />
							</Suspense>
							<span >{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
