// src/data/mockMembers.ts
import { Member } from "../types/member.types";

const firstNames = [
	"Sarah", "John", "Lerato", "Thabo", "Naledi",
	"Michael", "Kabelo", "Tumi", "Ayanda", "Noluthando",
	"Sipho", "Zanele", "Daniel", "Karabo", "Emily",
];

const lastNames = [
	"Mokoena", "Smith", "Nkosi", "Dlamini", "Pillay",
	"Naidoo", "Khumalo", "Mabaso", "Botha", "Mthembu",
	"Molefe", "Govender", "van der Merwe", "Nkuna", "Sithole",
];

const roles = ["Admin", "Editor", "Viewer", "Manager", "Operator"];

function randomPhone(): string {
	const prefix = "07" + Math.floor(Math.random() * 9);
	const suffix = Math.floor(1000000 + Math.random() * 9000000);
	return `${prefix}${suffix}`;
}

function randomEmail(firstName: string, lastName: string): string {
	return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
}

function padId(num: number, size = 3): string {
	return "A" + num.toString().padStart(size, "0");
}

export function generateMockMembers(count = 20): Member[] {
	const members: Member[] = [];
	for (let i = 1; i <= count; i++) {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		members.push({
			id: padId(i),
			firstName,
			lastName,
			email: randomEmail(firstName, lastName),
			role: roles[Math.floor(Math.random() * roles.length)],
			contact: randomPhone(),
		});
	}
	return members;
}

// Default export of 20 members
const mockMembers = generateMockMembers(20);
export default mockMembers;
