import {
  Home,
  LayoutDashboard,
  User,
  Users,
  Handshake,
  LandPlot,
  Calendar,
  ClipboardList,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu-Items
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Members",
    url: "#",
    icon: Users,
  },
  {
    title: "Teams",
    url: "#",
    icon: Handshake,
  },
  {
    title: "Facilities",
    url: "#",
    icon: LandPlot,
  },
  {
    title: "Players",
    url: "#",
    icon: Users,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Report",
    url: "#",
    icon: ClipboardList,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
