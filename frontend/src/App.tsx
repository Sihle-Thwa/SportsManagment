import './App.css';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import {AppSideBar } from './components/layout/SideNav/app-sidebar';

export default function App() {
  return (
    <SidebarProvider>
      <div className="App">
        <SidebarTrigger />
        <AppSideBar />
        <main>
          <h1>Welcome to the Complete Sports Management Software</h1>
        </main>
      </div>
    </SidebarProvider>
  );
}

