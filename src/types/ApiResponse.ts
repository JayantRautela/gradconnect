

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