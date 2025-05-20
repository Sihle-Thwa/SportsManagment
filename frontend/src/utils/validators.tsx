export const userInfoValidation = {
  firstName: (value: string) => value ? '' : 'First name is required',
  lastName: (value: string) => value ? '' : 'Last name is required',
  gender: (value: string) => ['female', 'male', 'other'].includes(value) ? '' : 'Please select a valid gender',
  dateOfBirth: (value: Date) => value instanceof Date ? '' : 'Date of birth is required',
  phone: (value: string) => value ? '' : 'Phone number is required',
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Invalid email address';
  },
  addressLine1: (value: string) => value ? '' : 'Address Line 1 is required',
  addressLine2: (value: string) => value? '': 'Address Line 2 is required', // Optional field
  city: (value: string) => value ? '' : 'City is required',
  province: (value: string) => value ? '' : 'Province is required',
  postCode: (value: string) => value ? '' : 'Post code is required',
  country: (value: string) => value ? '' : 'Country is required',
};

type UserInfoValues = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postCode: string;
  country: string;
};

export const validateUserInfo = (values: UserInfoValues) => {
  const errors: { [key: string]: string } = {};
  (Object.keys(userInfoValidation) as (keyof typeof userInfoValidation)[]).forEach(field => {
    let error = '';
    switch (field) {
      case 'dateOfBirth':
        error = userInfoValidation[field](values[field] as Date);
        break;
      default:
        error = userInfoValidation[field](values[field] as string);
        break;
    }
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};

export const UserInfoFormDefaultValues = {
  firstName: '',
  lastName: '',
  gender: 'female',
  dateOfBirth: new Date(),
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postCode: '',
  country: 'south-africa',
};

export const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' }
];

export const COUNTRY_OPTIONS = [
  { value: 'south-africa', label: 'South Africa' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];
export const PROVINCE_OPTIONS = [
  { value: 'gauteng', label: 'Gauteng' },
  { value: 'western-cape', label: 'Western Cape' },
  { value: 'eastern-cape', label: 'Eastern Cape' },
  { value: 'kwazulu-natal', label: 'KwaZulu-Natal' },
  { value: 'mpumalanga', label: 'Mpumalanga' },
  { value: 'limpopo', label: 'Limpopo' },
  { value: 'north-west', label: 'North West' },
  { value: 'free-state', label: 'Free State' },
  { value: 'northern-cape', label: 'Northern Cape' }
];