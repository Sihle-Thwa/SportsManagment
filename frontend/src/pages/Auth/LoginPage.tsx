"use client";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "../../components/Form/Fields/TextField";
import "./loginpage.css";
import { LogIn as GoogleIcon } from "lucide-react";

export default function LoginPage() {
	const methods = useForm();

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
							Login in to your account
						</div>
						<div className="loginPageContent_header_subtitle">
							Welcome Back! Please enter your details.
						</div>
					</div>
					<FormProvider {...methods}>
						<div className="loginPageForm_content">
							<form className="loginPageForm_body">
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
							</form>
							<div className="loginPageForm_bodyForgotPassword">
								<div className="loginPageForm_bodyForgotPassword_checkbox">
									<input type="checkbox" id="rememberMe" />
									<label htmlFor="rememberMe">Remember Me</label>
								</div>
								<a
									href="/forgot-password"
									className="loginPageForm_bodyForgotPassword_link"
								>
									Forgot Password?
								</a>
							</div>
						</div>
						<div className="loginPageForm_bodyFooter">
							<div className="loginPageForm_bodyFooter_cta">
                                <button className="button-primary button-lg loginPageForm_bodyFooter_cta_primaryButton"
                                type="submit">
									Log in
								</button>
                                <button className="button-secondary button-lg loginPageForm_bodyFooter_cta_secondaryButton"
                                    type="submit">
                                    <div className="loginPageForm_bodyFooter_icon">
                                        <GoogleIcon />
                                    </div>
									Log in with Google
								</button>
							</div>
						</div>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
