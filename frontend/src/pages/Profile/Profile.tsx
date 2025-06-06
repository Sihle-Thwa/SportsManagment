import React, { useState } from 'react';
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { FileUploadCard } from '../../components/FileUpload';


const Profile: React.FC = () => {

  const [formData, setFormData] = useState<unknown | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (data: unknown) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
    setIsSubmitted(true);
  };



  return (
    <div className="space-y-6 p-6 ">
      <div className="mb-6">
        <h1 >User Profile</h1>
        <h2 >View and Manage all members of your organisation</h2>
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