// src/auth/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { AuthContext, type AuthContextType } from "./hooks/useAuth";
import type { UserProfile } from "./types/auth.types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	// keys used for persistence
	const TOKEN_KEY = "auth.token";
	const USER_KEY = "auth.user";

	// hydrate from localStorage
	useEffect(() => {
		try {
			const rawToken = localStorage.getItem(TOKEN_KEY);
			const rawUser = localStorage.getItem(USER_KEY);
			if (rawToken) setToken(rawToken);
			if (rawUser) setUser(JSON.parse(rawUser) as UserProfile);
		} finally {
			setLoading(false);
		}
	}, []);

	const signIn: AuthContextType["signIn"] = async (
		email,
		password,
		remember = false,
	) => {
		// minimal mock implementation - replace with real API call
		setLoading(true);
		try {
			// simulate API call
			await new Promise((r) => setTimeout(r, 400));
			// include password in token generation so the parameter is used (mock only)
			const fakeToken = btoa(`${email}:${password}:${Date.now()}`);
			const fakeUser: UserProfile = {
				id: email,
				firstName: email.split("@")[0] || "User",
				lastName: "",
				email,
			} as unknown as UserProfile;
			setToken(fakeToken);
			setUser(fakeUser);
			if (remember) {
				localStorage.setItem(TOKEN_KEY, fakeToken);
				localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
			} else {
				localStorage.removeItem(TOKEN_KEY);
				localStorage.removeItem(USER_KEY);
			}
		} finally {
			setLoading(false);
		}
	};

	const register: AuthContextType["register"] = async (
		firstName,
		lastName,
		email,
		password,
	) => {
		setLoading(true);
		try {
			// simulate API call / user creation
			await new Promise((r) => setTimeout(r, 400));
			// include password in token generation so the parameter is used (mock only)
			const fakeToken = btoa(`${email}:${password}:${Date.now()}`);
			const fakeUser: UserProfile = {
				id: email,
				firstName,
				lastName,
				email,
			} as unknown as UserProfile;
			setToken(fakeToken);
			setUser(fakeUser);
			// persist by default (registration typically keeps user logged in)
			localStorage.setItem(TOKEN_KEY, fakeToken);
			localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
		} finally {
			setLoading(false);
		}
	};

	const signOut: AuthContextType["signOut"] = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	};

	const refresh: AuthContextType["refresh"] = async () => {
		// simulate token refresh
		if (!token) throw new Error("No token to refresh");
		await new Promise((r) => setTimeout(r, 300));
		const newToken = btoa(`${token}:${Date.now()}`);
		setToken(newToken);
		localStorage.setItem(TOKEN_KEY, newToken);
	};

	const value: AuthContextType = {
		user,
		token,
		loading,
		signIn,
		register,
		signOut,
		refresh,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
