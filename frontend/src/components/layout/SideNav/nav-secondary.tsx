import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "../../ui/sidebar";
import { lazy, Suspense } from "react";
import "../../../styles/global.css"; // Import your global styles

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
					className="flex flex-row items-start justify-start w-full"
					key={item.title}
				>
					<SidebarMenuButton asChild>
						<a
							href={item.url}
							className="flex items-center rounded-lg text-muted-foreground hover:bg-gray-100 transition-colors px-3 py-2 gap-2"
						>
							<Suspense fallback={<span>Loading...</span>}>
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
