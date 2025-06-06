import React, { useState } from 'react';
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { UserInfoFormDefaultValues } from "../../utils/validators";
import { Button } from '../../components/common/Button';
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


    <div className="flex flex-col items-start justify-start min-h-screen p-3">
      <div className="mb-6">
        <h1 >User Profile</h1>
        <h2 >View and Manage all members of your organisation</h2>
      </div>
      <FileUploadCard description={'Upload a picture for your profile picture'} onFileSelect={function (): void {
        throw new Error('Function not implemented.');
      }} />
      <div className="flex max-w-full mx-auto p-6">

        {isSubmitted ? (
          <div className="p-6">
            <h2 >Form Submitted Successfully!</h2>
            <p >Thank you for submitting your information.</p>

            <div className="border-t pt-3 mt-3">
              <h3 >Submitted Data:</h3>
              <pre >
                {JSON.stringify(formData, (key, value) => {
                  // Format date object for display
                  if (key === 'dateOfBirth' && value instanceof Date) {
                    return value.toLocaleDateString();
                  }
                  return value;
                }, 2)}
              </pre>
            </div>

            <Button
              className="btn-base"
              withIcon={false}
              onClick={() => {
                setFormData(null);
                setIsSubmitted(false);
              }}
              variant='primary'
            >
              Submit Another Form
            </Button>
          </div>
        ) : (
          <UserInfoForm
            defaultValues={UserInfoFormDefaultValues}
            onSubmit={handleSubmit}
            formTitle="User Information"

          />
        )}
      </div>
    </div>

  );
};

export default Profile;