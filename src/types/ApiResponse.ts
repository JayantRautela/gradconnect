import { Course } from "@prisma/client";

export interface AdminSignUpResponse {
    success: boolean;
    message: string;
}

export interface StudentSignUpResponse {
    success: boolean;
    message: string;
    userId?: string;
}

export interface AlumniSignUpResponse {
    success: boolean;
    message: string;
}

export interface StudentVerifyResponse {
    success: boolean;
    message: string;
}

export interface Admin {
    id: string;
    CollegeName: string;
    acceptedDomain: string;
    user: {
        email: string;
    }
    userId: string;
    collegeLogo: string;
}

export interface AdminProfileResponse {
    success: boolean;
    message: string;
    admin: {
        id: string;
        CollegeName: string;
        acceptedDomain: string;
        user: {
            email: string;
        }
        userId: string;
        collegeLogo: string;
    }
}

export interface Alumni {
    user: {
        email: string;
    };
    name: string;
    id: string;
    createdAt: Date;
    course: Course;
    branch: string;
    isVerified: boolean;
    ProfilePictureUrl: string | null;
    phoneNumber: string;
    cgpa: number;
    currentCompany: string;
    yearOfExperience: number;
    passoutYear: number;
    isOpenToTakeMentorshipSession: boolean;
    linkedinProfileUrl: string;
    portfolioLink: string | null;
}

export interface AlumniPendingRequestResponse {
    success: boolean;
    message: string;
    pendingRequest: number;
    alumniRequest: Alumni[];
}