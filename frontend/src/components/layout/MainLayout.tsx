import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActivePage } from '../../store/slices/navSlices';
import { routes } from '../../routes';

import TopNav from './TopNav/app-topbar';
import SideNav from './SideNav/app-sidebar';
import Header from './Header/app-header';

const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { pageTitle } = useAppSelector(state => state.nav);
    
    // Update active page based on current route
    useEffect(() => {
      const currentPath = location.pathname;
      const currentRoute = routes.find(route => route.path === currentPath);
      
      if (currentRoute) {
        dispatch(setActivePage({
          pageId: currentRoute.id,
          pageTitle: currentRoute.title
        }));
      }
    }, [location.pathname, dispatch]);
  
    return (
      <div className="flex h-screen bg-gray-100">
        {/* SideNav - Fixed on the left */}
        <SideNav />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* TopNav - Fixed at the top */}
          <TopNav />
          
          {/* Header - Shows the current page title */}
          <Header title={pageTitle} />
          
          {/* Content Area - Scrollable */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };
  
  export default MainLayout;