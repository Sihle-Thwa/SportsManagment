import type { Players } from "../types/players.types";

function generateIdentificationNumber(nationality: string): string {
    switch (nationality) {
        case "South African":
            return (
                Math.floor(60 + Math.random() * 40).toString().padStart(2, "0") +
                Math.floor(1 + Math.random() * 12).toString().padStart(2, "0") +
                Math.floor(1 + Math.random() * 28).toString().padStart(2, "0") +
                Math.floor(100000000 + Math.random() * 899999999).toString()
            );
        case "Namibian":
            return "NA" + Math.floor(10000000 + Math.random() * 89999999).toString();
        case "Botswanan":
            return "BW" + Math.floor(10000000 + Math.random() * 89999999).toString();
        case "Zimbabwean":
            return "ZW" + Math.floor(10000000 + Math.random() * 89999999).toString();
        case "Mozambican":
            return "MZ" + Math.floor(10000000 + Math.random() * 89999999).toString();
        default:
            return "ID" + Math.random().toString().slice(2, 11);
    }
}

function padId(num: number, size = 3): string {
    return "P" + num.toString().padStart(size, "0");
}

function generateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }
    return age;
}

function randomEmail(firstName: string, lastName: string): string {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}


const firstNames = [
    "Thabo", "Lerato", "Petrus", "Tendai", "Keitumetse",
    "Carlos", "Nokuthula", "Vasco", "Boitumelo", "Simbarashe",
    "Helena", "Lindokuhle", "Aisha", "Kwame", "Fatima",
];

const middleNames = [
    "Andile", "Faith", "Peter", "Blessing", "Mpho",
    "Manuel", "Grace", "Luis", "Tebogo", "Tafadzwa",
    "Maria", "Sipho", "Zainab", "Kofi", "Amina",
];

const preferredNames = [
    "Thabs", "Pete", "Tendy", "Kei", "Carl",
    "Noks", "Vas", "Boity", "Simba", "Lena",
    "Lindo", "Aish", "KJ", "Fati", "Mo",
];

const lastNames = [
    "Mokoena", "Dlamini", "Nangolo", "Chirwa", "Kgosi",
    "Matola", "Khumalo", "Mucavele", "Rankgopa", "Nyathi",
    "Shikongo", "Mhlongo", "Abdi", "Mensah", "Diallo",
];

const nationalities = [
    "South African", "Namibian", "Botswanan", "Zimbabwean", "Mozambican",
];

const dateOfBirths = [
    "1997-05-12", "1995-11-08", "1993-07-24", "1998-01-15", "2000-03-09",
    "1996-09-21", "1994-02-02", "1999-12-11", "2002-06-27", "1991-08-04",
    "1998-04-10", "2001-10-22", "1994-07-19", "1990-03-30", "1992-12-05",
];

const genders = ["Male", "Female", "Other"];

const contacts = [
    "+27 72 555 0134", "+27 74 238 4521", "+264 81 765 9012", "+263 77 334 5678", "+267 71 889 341",
    "+258 84 902 1177", "+27 76 302 4468", "+258 86 112 4579", "+267 72 661 239", "+263 78 410 5560",
    "+264 85 622 3411", "+27 73 100 8875", "+27 71 234 5678", "+233 24 123 4567", "+221 77 123 4567",
];

const statusOptions = ["Active", "Injured", "Suspended", "Retired"];



export function generateMockPlayers(count = 20): Players[] {
    const players: Players[] = [];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
        const dob = dateOfBirths[Math.floor(Math.random() * dateOfBirths.length)];

        players.push({
            id: padId(i),
            firstName,
            middleName,
            preferredName: preferredNames[Math.floor(Math.random() * preferredNames.length)],
            lastName,
            nationality,
            dateOfBirth: dob,
            age: generateAge(dob),
            gender: genders[Math.floor(Math.random() * genders.length)],
            contact: contacts[Math.floor(Math.random() * contacts.length)],
            email: randomEmail(firstName, lastName),
            identificationNumber: generateIdentificationNumber(nationality),
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        });
    }

    return players;
}

// Single generated dataset (so both functions use same base data)
const mockPlayers = generateMockPlayers(20);

/**
 * ✅ PlayersTable Data:
 * Returns minimal view optimized for table rendering.
 */
export function getPlayersTableData() {
    return mockPlayers.map((p) => ({
        id: p.id,
        firstName: p.firstName,
        lastName: p.lastName,
        status: p.status,
    }));
}

/**
 * ✅ PlayersForm Data:
 * Returns the detailed player profiles for forms or detail views.
 */
export function getPlayersFormData() {
    return mockPlayers.map(
        ({
            id,
            firstName,
            middleName,
            preferredName,
            lastName,
            nationality,
            dateOfBirth,
            age,
            gender,
            contact,
            email,
            identificationNumber,
            status,
        }) => ({
            id,
            firstName,
            middleName,
            preferredName,
            lastName,
            nationality,
            dateOfBirth,
            age,
            gender,
            contact,
            email,
            identificationNumber,
            status,
        }),
    );
}

export default mockPlayers;
