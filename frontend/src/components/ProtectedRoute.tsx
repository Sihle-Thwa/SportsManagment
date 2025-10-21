// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth.loading) {
		return (
			<div
				className="h-full w-full flex items-center justify-center"
				aria-busy="true"
			>
				<span className="sr-only">Loading...</span>
				<div aria-hidden className="loader" />
			</div>
		);
	}

	if (!auth.user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};
