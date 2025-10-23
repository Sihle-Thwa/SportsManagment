import React from "react";
import type { UserProfile } from "../types/auth.types";

export type AuthContextType = {
	user: UserProfile | null;
	token: string | null;
	loading: boolean;
	signIn: (
		email: string,
		password: string,
		remember?: boolean,
	) => Promise<void>;
	signUp: (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => Promise<void>;
	signOut: () => void;
	refresh: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
	undefined,
);

export const useAuth = () => {
	const ctx = React.useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
};
