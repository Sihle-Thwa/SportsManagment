// src/pages/profile/Profile.tsx
"use client";
import React from "react";
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { FileUploadCard } from "../../components/FileUpload";
import "./profile.css";

const Profile: React.FC = () => {
	const handleSubmit = (data: unknown) => {
		console.log("Form submitted with data:", data);
	};

	return (
		<div className="profileRoot">
			<div className="profileHeader" aria-labelledby="profile-title">
				<div>
					<div id="profile-title" className="profileTitle">
						User Profile
					</div>
					<div className="profileSubtitle">
						View and manage members of your organisation. Update personal
						details, upload a profile photo, and adjust contact information.
					</div>
				</div>
			</div>

			<section className="profileGrid" aria-label="Profile editor">
				<div className={`profileColumn uploadCol`}>
					<FileUploadCard
						description="Upload a picture for your profile (max 800×400, JPG/PNG/SVG/GIF)"
						onFileSelect={(file: File) => {
							console.log("File selected:", file.name);
						}}
					/>
				</div>

				<div className={`profileColumn formCol`}>
					<UserInfoForm onSubmit={handleSubmit} />
				</div>
			</section>
		</div>
	);
};

export default Profile;
