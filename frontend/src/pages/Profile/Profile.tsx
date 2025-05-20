import React, { useState } from 'react';
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import { UserInfoFormDefaultValues } from "../../utils/validators";


const Profile: React.FC = () => {

  const [formData, setFormData] = useState<unknown | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


   const handleSubmit = (data: unknown) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
    setIsSubmitted(true);
  };



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {isSubmitted ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h2>
            <p className="mb-4">Thank you for submitting your information.</p>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Submitted Data:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(formData, (key, value) => {
                  // Format date object for display
                  if (key === 'dateOfBirth' && value instanceof Date) {
                    return value.toLocaleDateString();
                  }
                  return value;
                }, 2)}
              </pre>
            </div>
            
            <button 
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => {
                setFormData(null);
                setIsSubmitted(false);
              }}
            >
              Submit Another Form
            </button>
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