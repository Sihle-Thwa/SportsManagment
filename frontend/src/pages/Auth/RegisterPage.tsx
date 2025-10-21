"use client";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "../../components/Form/Fields/TextField";
import "./registerpage.css";
import { LogIn as GoogleIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RegisterForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

export default function RegisterPage() {
	const methods = useForm<RegisterForm>({ defaultValues: {} });
	const { handleSubmit } = methods;
	const auth = useAuth();
	const navigate = useNavigate();

	const [agree, setAgree] = useState(false);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	async function onSubmit(values: RegisterForm) {
		setErr(null);
		if (!agree) {
			setErr("Please accept Terms and Conditions");
			return;
		}
		if (values.password !== values.confirmPassword) {
			setErr("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			await auth.register(
				values.firstName,
				values.lastName,
				values.email,
				values.password,
			);
			navigate("/dashboard", { replace: true });
		} catch (error: unknown) {
			setErr((error as { message?: string })?.message ?? "Registration failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="registerPageRoot">
			<div className="registerPageHeader">
				<div className="registerPageHeaderContainer">
					<div className="registerPageHeaderContainer_brand">
						Logo Company Name
					</div>
					<div className="registerPageHeaderContainer_cta">
						<div className="registerPageHeaderContainer_cta_text">
							You have an account?
						</div>
						<a href="/login" className="registerPageHeaderContainer_cta_link">
							Log In
						</a>
					</div>
				</div>
			</div>
			<div className="registerPageContainer">
				<div className="registerPageContent">
					<div className="registerPageContent_header">
						<div className="registerPageContent_header_title">
							Register your account
						</div>
						<div className="registerPageContent_header_subtitle">
							Get started with your free account.
						</div>
						<div className="accentLine_registerPageForm" aria-hidden />
					</div>
					<FormProvider {...methods}>
						<div className="registerPageForm_content">
							<form
								className="registerPageForm_body"
								onSubmit={handleSubmit(onSubmit)}
								noValidate
							>
								<TextField
									label="First Name"
									name="firstName"
									required
									placeholder="First Name"
								/>
								<TextField
									label="Last Name"
									name="lastName"
									required
									placeholder="Last Name"
								/>
								<TextField
									label="Email"
									name="email"
									required
									placeholder="Email/Username"
								/>
								<TextField
									id="password"
									label="Password"
									name="password"
									required
									type="password"
									placeholder="Password"
								/>
								<TextField
									id="confirmPassword"
									label="Confirm Password"
									name="confirmPassword"
									required
									type="password"
									placeholder="Confirm Password"
								/>
								{/* Terms checkbox - uses setAgree so the setter is not unused */}
								<div className="registerPageForm_terms">
									<input
										id="agree"
										type="checkbox"
										checked={agree}
										onChange={(e) => setAgree(e.target.checked)}
									/>
									<label htmlFor="agree">
										I accept the Terms and Conditions
									</label>
								</div>

								{err && (
									<div role="alert" className="registerPageForm_error">
										{err}
									</div>
								)}
								<div className="registerPageForm_bodyLoginRedirect">
									<div className="registerPageForm_bodyLoginRedirect_text">
										<label htmlFor="rememberMe">
											Already have an account?{" "}
										</label>
									</div>
									<a
										href="/login"
										className="registerPageForm_bodyForgotPassword_link"
									>
										Log In
									</a>
								</div>
								<div className="registerPageForm_bodyFooter">
									<div className="registerPageForm_bodyFooter_cta">
										<button
											className="button-primary button-lg registerPageForm_bodyFooter_cta_primaryButton"
											type="submit"
											disabled={loading}
										>
											{loading ? "Creating…" : "Register"}
										</button>
										<button
											className="button-secondary button-lg registerPageForm_bodyFooter_cta_secondaryButton"
											type="button"
											onClick={() =>
												alert("Google sign up demo — integrate your provider")
											}
										>
											<div className="registerPageForm_bodyFooter_icon">
												<GoogleIcon />
											</div>
											Register with Google
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
