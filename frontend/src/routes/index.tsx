import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const MainLayout = lazy(() => import("../components/layout/MainLayout"));
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Auth/RegisterPage"));

import Planner from "../pages/Calendar/Planner";
import Dashboard from "../pages/Dashboard/Dashboard";
import Facilities from "../pages/Facilities/Facilities";
import Members from "../pages/Members/Members";
import Players from "../pages/Players/Players";
import Profile from "../pages/Profile/Profile";
import { ProtectedRoute } from "../components/ProtectedRoute";

// Icons
import {
	LayoutDashboard,
	User,
	Users,
	LandPlot,
	Calendar,
} from "lucide-react";

export const routes = [
	{
		id: "dashboard",
		path: "/dashboard",
		title: "Dashboard",
		element: <Dashboard />,
		icon: <LayoutDashboard />,
	},
	{
		id: "profile",
		path: "/profile",
		title: "Profile",
		element: <Profile />,
		icon: <User />,
	},
	{
		id: "members",
		path: "/members",
		title: "Members",
		element: <Members />,
		icon: <Users />,
	},
	{
		id: "facilities",
		path: "/facilities",
		title: "Facilities",
		element: <Facilities />,
		icon: <LandPlot />,
	},
	{
		id: "players",
		path: "/players",
		title: "Players",
		element: <Players />,
		icon: <Users />,
	},
	{
		id: "planner",
		path: "/planner",
		title: "Planner",
		element: <Planner />,
		icon: <Calendar />,
	},

];

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/signIn" replace />,
	},
	{
		path: "/signIn",
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: "/signUp",
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<RegisterPage />
			</Suspense>
		),
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Suspense fallback={<div>Loading...</div>}>
					<MainLayout />
				</Suspense>
			</ProtectedRoute>
		),
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "members",
				element: <Members />,
			},
			{
				path: "facilities",
				element: <Facilities />,
			},
			{
				path: "players",
				element: <Players />,
			},
			{
				path: "planner",
				element: <Planner />,
			},
		],
	},
]);

export default router;
