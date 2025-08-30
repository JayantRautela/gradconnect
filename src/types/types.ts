type SessionResponse = {
    user?: {
        name?: string;
        email?: string;
        role?: "ADMIN" | "ALUMNI" | "STUDENT";
    }
    expires: string;
}