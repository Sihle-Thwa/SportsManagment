import { useContext, createContext } from "react";
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
	register: (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => Promise<void>;
	signOut: () => void;
	refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
};
