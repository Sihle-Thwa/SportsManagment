import  { useState } from 'react';
import { format } from 'date-fns';
import {  ChevronDown, CalendarIcon } from 'lucide-react';
import { 
  validateUserInfo, 
  UserInfoFormDefaultValues, 
  GENDER_OPTIONS, 
  COUNTRY_OPTIONS,
   
} from '../../utils/validators';
import { Select } from '../ui/select';

type UserInfoFormProps = {
  defaultValues?: typeof UserInfoFormDefaultValues;
  onSubmit: (formData: typeof UserInfoFormDefaultValues) => void;
  formTitle?: string;
};

export const UserInfoForm = ({
  defaultValues = UserInfoFormDefaultValues,
  onSubmit,
  formTitle = "User Information"
}: UserInfoFormProps) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof UserInfoFormDefaultValues, string>>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (field: keyof typeof UserInfoFormDefaultValues, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateUserInfo(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-2xl font-bold mb-6">{formTitle}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <div className={`relative w-full px-3 py-2 border rounded-md appearance-none ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
              <Select
                value={formData.gender}
                onValueChange={(value: string) => handleChange('gender', value)}
              >
                {GENDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
            </div>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <div className="relative">
              <div 
                className={`flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span>{formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : 'Select date'}</span>
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </div>
              
              {showCalendar && (
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-3">
                  <div className="flex flex-col">
                    {/* Simple month/year selector */}
                    <div className="flex justify-between mb-2">
                      <button 
                        type="button"
                        className="p-1"
                        onClick={() => {
                          const newDate = new Date(formData.dateOfBirth);
                          newDate.setMonth(newDate.getMonth() - 1);
                          handleChange('dateOfBirth', newDate);
                        }}
                      >
                        &lt;
                      </button>
                      <div>
                        {formData.dateOfBirth && format(formData.dateOfBirth, 'MMMM yyyy')}
                      </div>
                      <button 
                        type="button"
                        className="p-1"
                        onClick={() => {
                          const newDate = new Date(formData.dateOfBirth);
                          newDate.setMonth(newDate.getMonth() + 1);
                          handleChange('dateOfBirth', newDate);
                        }}
                      >
                        &gt;
                      </button>
                    </div>
                    
                    {/* Simple calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs p-1">{day}</div>
                      ))}
                      
                      {Array(31).fill(null).map((_, i) => {
                        const day = i + 1;
                        const currentDate = new Date(formData.dateOfBirth);
                        currentDate.setDate(day);
                        
                        // Only render if day is valid for current month
                        if (currentDate.getDate() !== day) return null;
                        
                        const isSelected = 
                          formData.dateOfBirth && 
                          formData.dateOfBirth.getDate() === day &&
                          formData.dateOfBirth.getMonth() === currentDate.getMonth();
                          
                        return (
                          <button
                            key={day}
                            type="button"
                            className={`text-center p-1 rounded-full w-8 h-8 ${
                              isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => {
                              handleChange('dateOfBirth', currentDate);
                              setShowCalendar(false);
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Address Line 1 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Address Line 1</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
            />
            {errors.addressLine1 && (
              <p className="text-sm text-red-500">{errors.addressLine1}</p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Address Line 2 (Optional)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          {/* Province */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Province</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Province"
              value={formData.province}
              onChange={(e) => handleChange('province', e.target.value)}
            />
            {errors.province && (
              <p className="text-sm text-red-500">{errors.province}</p>
            )}
          </div>

          {/* Post Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Code</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.postCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Post Code"
              value={formData.postCode}
              onChange={(e) => handleChange('postCode', e.target.value)}
            />
            {errors.postCode && (
              <p className="text-sm text-red-500">{errors.postCode}</p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <div className={`relative w-full px-3 py-2 border rounded-md appearance-none ${errors.country ? 'border-red-500' : 'border-gray-300'}`}>
              <Select
                value={formData.country}
                onValueChange={(value: string) => handleChange('country', value)}
              >
                {COUNTRY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
            </div>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};