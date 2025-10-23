import { createContext, useContext } from "react";
import type { UserProfile } from "../types/auth.types";

export type AuthContextType = {
	user: UserProfile;
	token: string;
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

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
