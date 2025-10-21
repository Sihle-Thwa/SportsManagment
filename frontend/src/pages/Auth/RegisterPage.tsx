"use client";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "../../components/Form/Fields/TextField";
import "./registerpage.css";
import { LogIn as GoogleIcon } from "lucide-react";

export default function RegisterPage() {
	const methods = useForm();

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
						<a
							href="/register"
							className="registerPageHeaderContainer_cta_link"
						>
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
							<form className="registerPageForm_body">
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
							</form>
							<div className="registerPageForm_bodyForgotPassword">
								<div className="registerPageForm_bodyForgotPassword_checkbox">
									<input type="checkbox" id="rememberMe" />
									<label htmlFor="rememberMe">Remember Me</label>
								</div>
								<a
									href="/forgot-password"
									className="registerPageForm_bodyForgotPassword_link"
								>
									Forgot Password?
								</a>
							</div>
						</div>
						<div className="registerPageForm_bodyFooter">
							<div className="registerPageForm_bodyFooter_cta">
								<button
									className="button-primary button-lg registerPageForm_bodyFooter_cta_primaryButton"
									type="submit"
								>
									Register
								</button>
								<button
									className="button-secondary button-lg registerPageForm_bodyFooter_cta_secondaryButton"
									type="submit"
								>
									<div className="registerPageForm_bodyFooter_icon">
										<GoogleIcon />
									</div>
									Register with Google
								</button>
							</div>
						</div>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
