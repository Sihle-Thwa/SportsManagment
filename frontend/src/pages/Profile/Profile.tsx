"use client";
import React from "react";
import UserInfoForm from "../../components/Form/UserInfoForm";
import "./profile.css";
import FileUploadCard from "../../components/FileUpload/FileUploadCard";

const Profile: React.FC = () => {
  const handleSubmit = (data: unknown) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="profileRoot">
      <div className="profileHeader" aria-labelledby="profile-header">
        <div>
          <div id="profile-title" className="profileTitle">
            User Profile
          </div>
          <div className="profileSubtitle">
            Edit / Manage your personal information.
          </div>
        </div>
      </div>

      <div className="profileContainer" aria-label="Profile editor">
        <div className="profileContent">
          <div className="uploadCol">
            <FileUploadCard />
          </div>
          <div className={`formCol`}>
            <UserInfoForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
