import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useState } from "react";

interface AppSideBarProps {
  currentPath: string;
}

export function AppSideBar({ currentPath }: AppSideBarProps) {
  const [activeRoute, setActiveRoute] = useState(currentPath);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>U-Organise</SidebarHeader>
      <SidebarContent>
        <NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

        <SidebarGroupLabel>Settings</SidebarGroupLabel>

        <NavSecondary />
      </SidebarContent>

      <SidebarFooter style={{ marginTop: "auto" }}>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export default AppSideBar;
