import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";

import { AppSideBar } from "./components/layout/SideNav/app-sidebar";
import AppTopBar from "./components/layout/TopNav/app-topbar";
import AppHeader from "./components/layout/Header/app-header";

export default function App() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <AppTopBar />
      <AppHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    </SidebarProvider>
  );
}
