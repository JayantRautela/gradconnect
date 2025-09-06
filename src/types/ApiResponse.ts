import { Course, Mode } from "@prisma/client";

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
    createdAt: Date;
}

export interface AdminProfileResponse {
    success: boolean;
    message: string;
    admin: Admin
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
    currentPosition: string;
    rollNo: string
}

export interface AlumniPendingRequestResponse {
    success: boolean;
    message: string;
    pendingRequest: number;
    alumniRequest: Alumni[];
}

export interface AcceptingAlumniRequestResponse {
    success: boolean;
    message: string;
    data?: Alumni;
}

export interface RejectingAlumniRequestResponse {
    success: boolean;
    message: string;
    data?: Alumni;
}

export interface AlumniDetailsResponse {
    success: boolean;
    message: string;
    alumni?: Alumni;
}

export interface GetPassoutYearsResponse { 
    success: boolean;
    message: string;
    years?: number[];
}

export interface GetAlumniResponse {
    success: boolean;
    message: string;
    alumni?: Alumni[];
}

export interface Event {
    id: string;
    place: string;
    time: Date
    title: string;
    description?: string;
    eventBannerUrl?: string;
    mode: Mode;
    createdAt: Date;
    createdBy: Admin;
}

export interface EventResponse {
    success: boolean;
    message: string;
    pastEvents?: Event[];
    upcomingEvents?: Event[];
}