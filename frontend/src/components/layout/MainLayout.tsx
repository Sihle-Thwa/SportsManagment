import {} from "react";
import AppSideBar from "@/components/layout/SideNav/app-sidebar";
import AppTopBar from "@/components/layout/TopNav/app-topbar";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import { SidebarProvider, SidebarInset } from "../ui/sidebar";

export function MainLayout() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="min-h-screen bg-gray-100 flex">
          {/* Sidebar */}
          <AppSideBar currentPath={window.location.pathname} />
          {/* Main Content Area */}
          <div className={`flex-1 transition-all duration-300 `}>
            {/* Top Navigation */}

            <AppTopBar />

            {/* Content Area */}
            <main className="p-7">
              <Outlet /> {/* This will render the matched child route */}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default MainLayout;
