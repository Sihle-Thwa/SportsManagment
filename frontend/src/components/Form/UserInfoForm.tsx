import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  validateUserInfo,
  UserInfoFormDefaultValues,
  GENDER_OPTIONS,
  COUNTRY_OPTIONS,
  PROVINCE_OPTIONS
} from '../../utils/validators';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';

type FormValues = typeof UserInfoFormDefaultValues;

interface UserInfoFormProps {
  defaultValues?: typeof UserInfoFormDefaultValues;
  onSubmit: (formData: typeof UserInfoFormDefaultValues) => void;
  formTitle?: string;
}

export function UserInfoForm({
  defaultValues = UserInfoFormDefaultValues,
  onSubmit,
  formTitle = "User Information"
}: UserInfoFormProps) {
  // Initializing react-hook-form
  const form = useForm<FormValues>({
    defaultValues,
  });

  // Storing validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Handling form submission with custom validation
  const handleSubmit = (data: FormValues) => {
    const errors = validateUserInfo(data);

    if (Object.keys(errors).length === 0) {
      onSubmit(data);
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  // Setting errors in react-hook-form when validationErrors change
  useEffect(() => {
    Object.entries(validationErrors).forEach(([field, message]) => {
      form.setError(field as keyof FormValues, {
        type: 'manual',
        message
      });
    });
  }, [validationErrors, form]);

  return (
    <Card className="w-full bg-white rounded-lg shadow-sm">
      <CardHeader>
        <h2 className="text-xl font-semibold mb-auto">{formTitle}</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className={cn(
                          validationErrors.firstName && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.firstName && (
                      <FormMessage>{validationErrors.firstName}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className={cn(
                          validationErrors.lastName && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.lastName && (
                      <FormMessage>{validationErrors.lastName}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={cn(
                          validationErrors.gender && "border-red-500"
                        )}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENDER_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && (
                      <FormMessage>{validationErrors.gender}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                              validationErrors.dateOfBirth && "border-red-500"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {validationErrors.dateOfBirth && (
                      <FormMessage>{validationErrors.dateOfBirth}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        {...field}
                        className={cn(
                          validationErrors.phone && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.phone && (
                      <FormMessage>{validationErrors.phone}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
                        {...field}
                        className={cn(
                          validationErrors.email && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.email && (
                      <FormMessage>{validationErrors.email}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Address Line 1 */}
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address Line 1"
                        {...field}
                        className={cn(
                          validationErrors.addressLine1 && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.addressLine1 && (
                      <FormMessage>{validationErrors.addressLine1}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Address Line 2 */}
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address Line 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className={cn(
                          validationErrors.city && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.city && (
                      <FormMessage>{validationErrors.city}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Province */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={cn(
                          validationErrors.province && "border-red-500"
                        )}>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROVINCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.province && (
                      <FormMessage>{validationErrors.province}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Post Code */}
              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Post Code"
                        {...field}
                        className={cn(
                          validationErrors.postCode && "border-red-500"
                        )}
                      />
                    </FormControl>
                    {validationErrors.postCode && (
                      <FormMessage>{validationErrors.postCode}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={cn(
                          validationErrors.country && "border-red-500"
                        )}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.country && (
                      <FormMessage>{validationErrors.country}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  );
}