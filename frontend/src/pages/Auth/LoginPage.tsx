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
	const methods = useForm<LoginForm>({ defaultValues: { remember: false } });
	const { handleSubmit, register } = methods;
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	// safety-typed access to location.state.from.pathname
	const from =
		(location.state as { from?: { pathname?: string } })?.from?.pathname ??
		"/dashboard";
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

	function handleNavigation() {
		// if there's an error, navigate to the error page
		if (error) {
			navigate("/error", { replace: true });
		} else {
			navigate(from, { replace: true });
		}
	}

	async function onSubmit(data: LoginForm) {
		setError(undefined);
		setLoading(true);

		try {
			// guard: if there's no AuthProvider, show helpful message instead of throwing
			if (!auth) {
				throw new Error("Authentication service is not available");
			}
			await auth.signIn(data.email.trim(), data.password, !!data.remember);
			handleNavigation();
		} catch (err) {
			setError((err as { message?: string }).message ?? "Sign In failed");
		} finally {
			setLoading(false);
			// Reset form state
			methods.reset();
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
						<a href="/signUp" className="loginPageHeaderContainer_cta_link">
							Sign Up
						</a>
					</div>
				</div>
			</div>
			<div
				className="loginPageContainer"
				role="main"
				aria-labelledby="login-page-title"
			>
				<div
					className="loginPageContent"
					aria-describedby="login-page-description"
				>
					<div className="loginPageContent_header" id="login-page-description">
						<div
							className="loginPageContent_header_title"
							id="login-page-title"
						>
							Log in to your account
						</div>
						<div
							className="loginPageContent_header_subtitle"
							id="login-page-subtitle"
						>
							Welcome Back! Please enter your details.
						</div>
						<div className="accentLine_loginPageForm" aria-hidden />
					</div>
					<FormProvider {...methods}>
						<form
							className="loginPageForm"
							onSubmit={handleSubmit(onSubmit)}
							noValidate
						>
							<TextField
								name="email"
								label="Email"
								type="email"
								placeholder="Enter your email"
								autoComplete="email"
								rules={{ required: "Email is required" }}
							/>
							<TextField
								name="password"
								label="Password"
								type="password"
								placeholder="Enter your password"
								autoComplete="current-password"
								rules={{ required: "Password is required" }}
							/>
							{error && <div className="formError">{error}</div>}
							<button
								type="submit"
								className="loginPageForm_submitButton"
								disabled={loading}
							>
								{loading ? "Loading..." : "Sign In"}
							</button>

							<div
								className="loginPageForm_rememberMe"
								id="remember-me-checkbox"
							>
								<div className="loginPageForm_rememberMe_cta">
									<input type="checkbox" {...register("remember")} />
									Remember Me
								</div>
							</div>

							<div
								className="loginPageForm_forgotPassword"
								id="forgot-password-link"
							>
								<a href="/forgot-password">Forgot Password?</a>
							</div>

							<div
								className="loginPageForm_divider"
								aria-label="or continue with"
							>
								<div className="loginPageForm_divider_line"></div>
							</div>
							<button type="button" className="loginPageForm_googleButton">
								<GoogleIcon className="loginPageForm_googleButton_icon" />
								Continue with Google
							</button>
						</form>
					</FormProvider>
				</div>
				<div className="loginPageImageSection">
					{/* Placeholder for image or illustration */}
				</div>
			</div>
		</div>
	);
}


