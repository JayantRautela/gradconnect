

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