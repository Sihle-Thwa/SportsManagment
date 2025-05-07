import { SidebarMenuItem, SidebarMenuButton, SidebarMenu } from '@/components/ui/sidebar';
import { HandHelping, Settings } from 'lucide-react';

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
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url} className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-gray-100">
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}