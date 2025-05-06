import {} from "react";
import AppSideBar from "@/components/layout/SideNav/app-sidebar";
import AppTopBar from "@/components/layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSideBar currentPath={window.location.pathname} />
      <SidebarInset>
        {/* Main Content Area */}
        <div className={`flex-1 shrink-0 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12`}>
          <SidebarTrigger className="ml-3"/>
          <Separator orientation="vertical" className="mr-2 h-4" />
          {<AppTopBar />}

          <main className="p-7">
            <Outlet /> {/* This will render the matched child route */}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default MainLayout;
