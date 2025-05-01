import Dashboard from '@/pages/Dashboard/Dashboard';
import { createBrowserRouter, Navigate } from 'react-router';

//import { lazy } from 'react';


// Define route configuration
export const routes = [
    {
      id: 'dashboard',
      path: '/dashboard',
      title: 'Dashboard',
      element: <Dashboard />,
      icon: 'LayoutDashboard',
    },
    {
      id: 'profile',
      path: '/profile',
      title: 'Profile',
      element: <Profile />,
      icon: 'Users',
    },
    {
      id: 'members',
      path: '/members',
      title: 'Members',
      element: <Members />,
      icon: 'BarChart2',
    },
    {
      id: 'teams',
      path: '/teams',
      title: 'Teams',
      element: <Teams />,
      icon: 'Settings',
    },
    {
        id: 'facilities',
        path: '/facilities',
        title: 'Facilities',
        element: <Facilities />,
        icon: '',
      },
      {
        id: 'Players',
        path: '/players',
        title: 'Players',
        element: <Players />,
        icon: 'Settings',
      },
      {
        id: 'calendar',
        path: '/calendar',
        title: 'Calendar',
        element: <Calendar />,
        icon: 'Calendar',
      },
      {
        id: 'reports',
        path: '/reports',
        title: 'Reports',
        element: <Report />,
        icon: '',
      },
  ];
  
  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        ...routes.map(route => ({
          path: route.path,
          element: route.element,
        })),
      ],
    },
  ]);
  
  export default router;