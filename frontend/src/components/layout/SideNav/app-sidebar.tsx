import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useState } from "react";

interface AppSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function AppSideBar({ isOpen, onClose, currentPath }: AppSideBarProps) {
  const [activeRoute, setActiveRoute] = useState(currentPath);

  return (
    <SidebarContent
      className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarMenu>
          <NavMain activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
          <NavSecondary />
        </SidebarMenu>
      </SidebarGroup>
      <NavUser />
    </SidebarContent>
  );
}
export default AppSideBar;
