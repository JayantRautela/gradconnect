

export interface AdminSignUpResponse {
    success: boolean;
    message: string;
}

export interface StudentSignUpResponse {
    success: boolean;
    message: string;
    userId?: string;
}