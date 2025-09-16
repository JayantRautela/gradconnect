import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        role: "ADMIN" | "STUDENT" | "ALUMNI"
        email: string,

        student?: {
            id: string;
            name: string;
            course: string;
            branch: string;
            isVerified: boolean;
            currentYear: string;
            profilePictureUrl?: string;
            collegeName: string;
        };

        alumni?: {
            id: string;
            name: string;
            phoneNumber: string;
            currentCompany: string;
            yearOfExperience: number;
            passoutYear: number;
            isVerified: boolean;
            branch: string;
            course: string;
            profilePictureUrl?: string;
            portfolioLink?: string;
            linkedinProfileUrl: string;
            collegeName: string;
        },

        admin?: {
            id: string;
            collegeName: string;
            acceptedDomain: string;
        };
    }
    interface Session {
        user: {
            id: string;
            role: 'STUDENT' | 'ALUMNI' | 'ADMIN';
            email: string;

            student?: User['student'];
            alumni?: User['alumni'];
            admin?: User['admin'];
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: 'STUDENT' | 'ALUMNI' | 'ADMIN';
        email: string;

        student?: {
            id: string;
            name: string;
            course: string;
            branch: string;
            isVerified: boolean;
            currentYear: string;
            profilePictureUrl?: string;
            collegeName: string;
        };

        alumni?: {
            id: string;
            name: string;
            phoneNumber: string;
            currentCompany: string;
            yearOfExperience: number;
            passoutYear: number;
            isVerified: boolean;
            branch: string;
            course: string;
            profilePictureUrl?: string;
            portfolioLink?: string;
            linkedinProfileUrl: string;
            collegeName: string
        };

        admin?: {
            id: string;
            collegeName: string;
            acceptedDomain: string;
        };
    }
}