import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { HandHelping, Settings } from "lucide-react";

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
							className="flex items-center rounded-lg text-muted-foreground hover:bg-gray-100"
						>
							<item.icon />
							<span>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
