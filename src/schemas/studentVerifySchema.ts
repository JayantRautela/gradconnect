import { z } from "zod";

export const studentVerifySchema = z.object({
    otp: z.string().length(6, 'Verification code must be 6 digits')
});