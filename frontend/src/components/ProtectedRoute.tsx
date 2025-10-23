import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const auth = useAuth();
	const location = useLocation();
	// while loading, you might want to show a spinner or placeholder
	if (auth.loading) {
		return <div>Loading...</div>;
	}
	// if not authenticated, redirect to signup
	if (!auth.user) {
		return <Navigate to="/signUp" state={{ from: location }} replace />;
	} else {
		// if authenticated, render the children components
		return <>{children}</>;
	}
};
