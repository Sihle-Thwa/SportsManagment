import { useState } from 'react';
import AppSideBar from '@/components/layout/SideNav/app-sidebar';
import AppTopBar from '@/components/layout/TopNav/app-topbar';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { SidebarProvider } from '../ui/sidebar';

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

    
  
  return (
    <SidebarProvider> 
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AppSideBar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentPath={window.location.pathname} // Pass the current path to highlight active links
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Navigation */}
        <AppTopBar />

        {/* Content Area */}
        <main className="p-8">
          <Outlet /> {/* This will render the matched child route */}
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
}
  export default MainLayout;