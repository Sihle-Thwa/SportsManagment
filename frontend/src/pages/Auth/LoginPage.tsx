"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "../../components/Form/Fields/TextField";
import { LogIn as GoogleIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./loginpage.css";

type LoginForm = {
	email: string;
	password: string;
	remember?: boolean;
};

export default function LoginPage() {
	const methods = useForm<LoginForm>({ defaultValues: { remember: true } });
	// use the destructured helpers so they are actually referenced
	const { handleSubmit, register } = methods;
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	// safety-typed access to location.state.from.pathname
	const from =
		(location.state as { from?: { pathname?: string } } | undefined)?.from
			?.pathname ?? "/";
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function onSubmit(data: LoginForm) {
		setError(null);
		setLoading(true);
		try {
			// guard: if there's no AuthProvider, show helpful message instead of throwing
			if (!auth) {
				throw new Error(
					"No AuthProvider found. Wrap your app/page with AuthProvider before using authentication.",
				);
			}
			await auth.signIn(data.email.trim(), data.password, !!data.remember);
			navigate(from, { replace: true });
		} catch (err: unknown) {
			setError((err as { message?: string }).message ?? "Sign in failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="loginPageRoot">
			<div className="loginPageHeader">
				<div className="loginPageHeaderContainer">
					<div className="loginPageHeaderContainer_brand">
						Logo Company Name
					</div>
					<div className="loginPageHeaderContainer_cta">
						<div className="loginPageHeaderContainer_cta_text">
							Don't have an account?
						</div>
						<a href="/register" className="loginPageHeaderContainer_cta_link">
							Sign Up
						</a>
					</div>
				</div>
			</div>
			<div className="loginPageContainer">
				<div className="loginPageContent">
					<div className="loginPageContent_header">
						<div className="loginPageContent_header_title">
							Log in to your account
						</div>
						<div className="loginPageContent_header_subtitle">
							Welcome Back! Please enter your details.
						</div>
						<div className="accentLine_loginPageForm" aria-hidden />
					</div>
					<FormProvider {...methods}>
						<div className="loginPageForm_content">
							{/* attach onSubmit so handleSubmit and onSubmit are used */}
							<form
								className="loginPageForm_body"
								onSubmit={handleSubmit(onSubmit)}
								noValidate
							>
								<TextField
									label="Email"
									name="email"
									required
									placeholder="Email/Username"
									type="email"
									autoComplete="email"
								/>
								<TextField
									id="password"
									label="Password"
									name="password"
									required
									type="password"
									placeholder="Password"
									autoComplete="current-password"
								/>

								{error && (
									<div role="alert" className="loginPageForm_error">
										{error}
									</div>
								)}

								<div className="loginPageForm_bodyForgotPassword">
									<div className="loginPageForm_bodyForgotPassword_checkbox">
										<input
											type="checkbox"
											id="rememberMe"
											{...register("remember")}
											defaultChecked
										/>
										<label htmlFor="rememberMe">Remember Me</label>
									</div>
									<a
										href="/forgot-password"
										className="loginPageForm_bodyForgotPassword_link"
									>
										Forgot Password?
									</a>
								</div>

								<div className="loginPageForm_bodyFooter">
									<div className="loginPageForm_bodyFooter_cta">
										<button
											className="button-primary button-lg loginPageForm_bodyFooter_cta_primaryButton"
											type="submit"
											disabled={loading}
										>
											{loading ? "Signing in…" : "Log in"}
										</button>
										<button
											type="button"
											className="button-secondary button-lg loginPageForm_bodyFooter_cta_secondaryButton"
											onClick={() =>
												alert("Google sign-in demo — integrate your provider")
											}
										>
											<span className="loginPageForm_bodyFooter_icon">
												<GoogleIcon />
											</span>
											Log in with Google
										</button>
									</div>
								</div>
							</form>
						</div>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
