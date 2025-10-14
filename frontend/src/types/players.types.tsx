export type Players = {
	id: string; // Unique identifier for the player
    firstName: string;
    middleName?: string; // Middle name is optional
    preferredName?: string; // Preferred name is optional
    lastName: string;
    nationality: string; // Place of birth / nationality
    dateOfBirth: string; // Date of birth in ISO format (YYYY-MM-DD)
    identificationNumber: string; // National ID or passport number
    age: number;
    gender: string;
    contact: string; // Contact number
    email: string; // Email address
};
