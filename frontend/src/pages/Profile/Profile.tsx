import React from 'react';
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { FileUploadCard } from '../../components/FileUpload';


const Profile: React.FC = () => {

  // Removed unused state: formData and isSubmitted

  const handleSubmit = (data: unknown) => {
    console.log('Form submitted with data:', data);
    // Removed setFormData and setIsSubmitted as their state is no longer used
  };


  return (
    <div className="space-y-6 p-6 ">
      <div className="mb-6">
        <h1 >User Profile</h1>
        <p >View and Manage all members of your organisation</p>
      </div>
      <div className="flex gap-6 md:flex-row flex-col">
        <div className="lg:flex-9/12 md:flex-3/4 flex-1/2">
          <FileUploadCard description={'Upload a picture for your profile picture'} onFileSelect={function (): void {
            throw new Error('Function not implemented.');
          }} />
        </div>
        <div className="lg:flex-9/12 md:flex-3/4 flex-1/2">
          <UserInfoForm onSubmit={handleSubmit} />
        </div>

      </div>


    </div>
  );
};

export default Profile;
// This code defines a Profile component that renders a user profile page with a form for user information and a file upload card for profile picture uploads. The form submission is handled by the handleSubmit function, which currently logs the submitted data to the console.
// The component uses Tailwind CSS for styling and is structured to be responsive, adapting to different screen sizes with flexbox. The FileUploadCard component is used to allow users to upload a profile picture, while the UserInfoForm component collects user information such as name, email, and contact details.
