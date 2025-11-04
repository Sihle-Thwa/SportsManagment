"use client";
import { SidebarHeader, SidebarContent, SidebarFooter } from "../../ui/sidebar";
import { useSidebar } from "../../ui/sidebar-context";
import NavMain from "./NavMain";
import NavSecondary from "./NavSecondary";
import NavUser from "./NavUser";
import "./appsidebar.css";
import brandIcon from "/Logolg.png";

export function AppSidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      id="appsidebar"
      className="appSidebar"
      aria-label="Primary navigation"
      aria-expanded={!isCollapsed}
    >
      <div className="appSidebarInner">
        <SidebarHeader className="appSidebarHeader">
          <div className="appSidebarBrand">
            <img src={brandIcon} className="appSidebarBrandIcon" aria-hidden />
            {!isCollapsed && (
              <span className="appSidebarBrandText">U-Organise</span>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="appSidebarContent">
          <NavMain collapsed={isCollapsed} />
          <NavSecondary collapsed={isCollapsed} />
        </SidebarContent>

        <SidebarFooter className="appSidebarFooter">
          <NavUser collapsed={isCollapsed} />
        </SidebarFooter>
      </div>
    </aside>
  );
}

export default AppSidebar;
