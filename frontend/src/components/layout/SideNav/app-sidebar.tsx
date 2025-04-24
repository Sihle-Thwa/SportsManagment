import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ArrowUpCircleIcon } from "lucide-react";

import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";
import { NavMain } from "./nav-main";

export function AppSideBar() {
  return (
    <Sidebar >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">U-Organise</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary />
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
