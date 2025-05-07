import {} from "react";
import AppSideBar from "@/components/layout/SideNav/app-sidebar";
import AppTopBar from "@/components/layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import { SidebarProvider, SidebarInset } from "../ui/sidebar";

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSideBar currentPath={window.location.pathname} />
      <SidebarInset>
        {/* Main Content Area */}
        <div className={`flex flex-col`}>
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
