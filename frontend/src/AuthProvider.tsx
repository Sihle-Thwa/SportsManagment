// src/auth/AuthProvider.tsx
import React from "react";
import { mockSignIn, mockRegister, mockGetProfileByToken } from "./store/mocks/auth";
import type { UserProfile } from "./types/auth.types";
import { AuthContext, AuthContextType } from "./AuthContext";

type AuthState = {
	user: UserProfile | null;
	token: string | null;
	loading: boolean;
};

const STORAGE_KEY = "uorg_auth_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, setState] = React.useState<AuthState>({
		user: null,
		token: null,
		loading: true,
	});

	React.useEffect(() => {
		(async () => {
			const token = localStorage.getItem(STORAGE_KEY);
			if (token) {
				const profile = await mockGetProfileByToken(token);
				setState({
					user: profile,
					token: profile ? token : null,
					loading: false,
				});
			} else {
				setState({ user: null, token: null, loading: false });
			}
		})();
	}, []);

	const signIn = React.useCallback(
		async (email: string, password: string, remember = true) => {
			const { token, profile } = await mockSignIn(email, password);
			if (remember) localStorage.setItem(STORAGE_KEY, token);
			setState({ user: profile, token, loading: false });
		},
		[],
	);

	const register = React.useCallback(
		async (
			firstName: string,
			lastName: string,
			email: string,
			password: string,
		) => {
			const { token, profile } = await mockRegister({
				firstName,
				lastName,
				email,
				password,
			});
			localStorage.setItem(STORAGE_KEY, token);
			setState({ user: profile, token, loading: false });
		},
		[],
	);

	const signOut = React.useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
		setState({ user: null, token: null, loading: false });
	}, []);

	const refresh = React.useCallback(async () => {
		if (!state.token) return;
		const profile = await mockGetProfileByToken(state.token);
		setState((s) => ({ ...s, user: profile ?? null }));
	}, [state.token]);

	const value = React.useMemo<AuthContextType>(
		() => ({
			user: state.user,
			token: state.token,
			loading: state.loading,
			signIn,
			register,
			signOut,
			refresh,
		}),
		[state, signIn, register, signOut, refresh],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
