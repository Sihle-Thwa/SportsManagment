import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Lazy load MainLayout
const MainLayout = lazy(() => import('../components/layout/MainLayout'));

// Other imports remain the same
import Planner from '../pages/Calendar/Planner';
import Dashboard from '../pages/Dashboard/Dashboard';
import Facilities from '../pages/Facilities/Facilities';
import Members from '../pages/Members/Members';
import Players from '../pages/Players/Players';
import Profile from '../pages/Profile/Profile';
import Report from '../pages/Reports/Report';
import Teams from '../pages/Teams/Teams';

// Icons
import {
  LayoutDashboard,
  User,
  Users,
  Handshake,
  LandPlot,
  Calendar,
  ClipboardList,
} from "lucide-react";

// Define route configuration
export const routes = [
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    element: <Dashboard />,
    icon: <LayoutDashboard />,
  },
  {
    id: 'profile',
    path: '/profile',
    title: 'Profile',
    element: <Profile />,
    icon: <User />,
  },
  {
    id: 'members',
    path: '/members',
    title: 'Members',
    element: <Members />,
    icon: <Users />,
  },
  {
    id: 'teams',
    path: '/teams',
    title: 'Teams',
    element: <Teams />,
    icon: <Handshake />,
  },
  {
    id: 'facilities',
    path: '/facilities',
    title: 'Facilities',
    element: <Facilities />,
    icon: <LandPlot />,
  },
  {
    id: 'players',
    path: '/players',
    title: 'Players',
    element: <Players />,
    icon: <Users />,
  },
  {
    id: 'planner',
    path: '/planner',
    title: 'Planner',
    element: <Planner />,
    icon: <Calendar />,
  },
  {
    id: 'reports',
    path: '/reports',
    title: 'Reports',
    element: <Report />,
    icon: <ClipboardList />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...routes.map(item => ({
        path: item.path,
        element: item.element,
      })),
    ],
  },
]);

export default router;