import "./App.css";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar";
import { Separator } from "@/components/ui/separator"

import { AppSideBar } from "./components/layout/SideNav/app-sidebar";
import { SearchForm } from "./components/common/Input/search-form";
import { NavUser } from "./components/layout/SideNav/nav-user";

export default function App() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <SearchForm className="w-md sm:ml-auto sm:w-auto" />

          <NavUser />
        </header>
      </SidebarInset>
      
    </SidebarProvider>
  );
}
