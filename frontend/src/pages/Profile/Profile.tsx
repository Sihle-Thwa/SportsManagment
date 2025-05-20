import React, { useState } from 'react';
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { UserInfoFormDefaultValues } from "../../utils/validators";
import { Button } from '@/components/common/Button';
import { FileUploadCard } from '@/components/FileUpload';


const Profile: React.FC = () => {

  const [formData, setFormData] = useState<unknown | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


   const handleSubmit = (data: unknown) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
    setIsSubmitted(true);
  };



  return (
    <div className="flex flex-row h-fit gap-6 bg-gray-50">
      <FileUploadCard description={'Upload a picture for your profile picture'} onFileSelect={function (): void {
        throw new Error('Function not implemented.');
      } }       />
      <div className="flex flex-row w-fit ">
        
        {isSubmitted ? (
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Form Submitted Successfully!</h2>
            <p className="mb-4">Thank you for submitting your information.</p>
            
            <div className="border-t pt-3 mt-3">
              <h3 className="text-lg font-semibold mb-3">Submitted Data:</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-auto">
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
              className="mt-6 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                setFormData(null);
                setIsSubmitted(false);
              }}
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