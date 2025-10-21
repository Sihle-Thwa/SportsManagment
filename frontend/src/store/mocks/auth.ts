// src/mocks/auth.ts
import type { UserProfile } from "../../types/auth.types";

type MockUser = {
    id: string;
    email: string;
    password: string; // plaintext for demo only
    profile: UserProfile;
};

const users: MockUser[] = [
    {
        id: "u1",
        email: "admin@example.com",
        password: "Password123",
        profile: {
            id: "u1",
            firstName: "Admin",
            lastName: "User",
            email: "admin@example.com",
        },
    },
    {
        id: "u2",
        email: "laurel@example.com",
        password: "Password123",
        profile: {
            id: "u2",
            firstName: "Laurel",
            lastName: "School",
            email: "laurel@example.com",
        },
    },
];

export async function mockSignIn(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 300));
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const token = `mock-token-${found.id}-${Date.now()}`;
    return { token, profile: found.profile };
}

export async function mockRegister(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}) {
    await new Promise((r) => setTimeout(r, 300));
    const exists = users.find((u) => u.email === payload.email);
    if (exists) throw new Error("Email already in use");
    const id = `u${users.length + 1}`;
    const newUser: MockUser = {
        id,
        email: payload.email,
        password: payload.password,
        profile: {
            id,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
        },
    };
    users.push(newUser);
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    return { token, profile: newUser.profile };
}

export async function mockGetProfileByToken(token?: string) {
    if (!token) return null;
    const parts = token.split("-");
    const id = parts[2];
    return users.find((u) => u.id === id)?.profile ?? null;
}