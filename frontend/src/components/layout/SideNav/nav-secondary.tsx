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
		<SidebarMenu className="flex flex-col gap-1 self-stretch items-start justify-center p-3 mt-auto">
			{items.map((item) => (
				<SidebarMenuItem
					className="flex w-full items-center"
					key={item.title}
				>
					<SidebarMenuButton asChild>
						<a
							href={item.url}
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted"
						>
							<Suspense fallback={<span className="w-5 h-5 animate-pulse" />}>
								<item.icon className="w-5 h-5" />
							</Suspense>
							<span className="font-medium">{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
