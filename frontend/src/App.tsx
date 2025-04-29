import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";

import { AppSideBar } from "./components/layout/SideNav/app-sidebar";
import AppTopBar from "./components/layout/TopNav/app-topbar";

export default function App() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <AppTopBar />
    </SidebarProvider>
  );
}
