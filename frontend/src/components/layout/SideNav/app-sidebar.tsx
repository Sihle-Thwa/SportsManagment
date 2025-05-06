import {
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,

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
    <SidebarContent className="flex flex-col max-w-60 min-w-6 bg-white border-r border-gray-200 h-screen ">
      <SidebarHeader>
        <SidebarGroupLabel>
          U-Organise
        </SidebarGroupLabel>
        
      </SidebarHeader>
      <SidebarMenu>
        <NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      </SidebarMenu>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        <NavSecondary />
      </SidebarMenu>

      <SidebarFooter style={{ marginTop: "auto" }}>
        <NavUser />
      </SidebarFooter>
    </SidebarContent>
  );
}
export default AppSideBar;
