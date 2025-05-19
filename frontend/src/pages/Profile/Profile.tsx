import { FileUploadCard } from '@/components/FileUpload'
import { FormBuilder, FieldType } from '@/components/FormBuilder';
import React from 'react'


const Profile: React.FC = () => {

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
    // Handle the file upload logic here
  }

  const formConfig ={
    title: 'Profile Information',
    fields: [
      {
        name: "First Name",
        label: "First Name",
        type: FieldType.Text,
        required: true,
      },
      {
        name: "Last Name",
        label: "Last Name",
        type: FieldType.Text,
        required: true,
      },
      {
        name: "Email",
        label: "Email",
        type: FieldType.Email,
        required: true,
      },
      {
        name: "Phone Number",
        label: "Phone Number",
        type: FieldType.Tel,
        required: true,
      }
      
    ]
  }


  const handleSubmit = (data: unknown) => {
    // If you expect data to be a Record<string, unknown>, you can type guard or cast here
    console.log('Form data:', data);
    // Handle the form submission logic here
  }

  return (
    <div className='space-y-6'>
      <div className='flex gap-6'>
        Profile
        <FileUploadCard 
        title='Upload Display Picture'
        description='Upload a picture to be displayed on your profile.'
        acceptedFileTypes='.jpg, .jpeg, .png'
        maxFileSize={5 * 1024 * 1024} // 5MB
        onFileSelect={handleFileSelect}
        />

        <FormBuilder
        config={formConfig}
        onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Profile;