import { z } from "zod";

export const studentSignUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must have atleast 6 characters").max(12, "Password should not be more than 12 characters"),
    course: z.enum(["BTECH", "MTECH", "BCA", "MCA", "BSC", "MSC", 'MBBS', "BBA", "MBA", "PHD", "BPHARMA", "MPHARMA", "BVOC", "MVOC"]),
    branch: z.string(),
    collegeName: z.string(),
    currentYear: z.enum(["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"]),
    name: z.string(),
    isVerified: z.boolean(),
    ProfilePictureUrl: z.url().optional(),
});

export const alumniSignUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must have atleast 6 characters").max(12, "Password should not be more than 12 characters"),
    course: z.enum(["BTECH", "MTECH", "BCA", "MCA", "BSC", "MSC", 'MBBS', "BBA", "MBA", "PHD", "BPHARMA", "MPHARMA", "BVOC", "MVOC"]),
    branch: z.string(),
    collegeName: z.string(),
    name: z.string(),
    phoneNumber: z.string().max(10, "Phone Number cannot be more than 10 digits"),
    cgpa: z.string().transform((val) => parseFloat(val)),
    yearOfExperience: z.string().transform((val) => parseFloat(val)),
    currentCompany: z.string(),
    passoutYear: z.number(),
    isOpenToTakeMentorshipSession: z.boolean(),
    linkedinProfileUrl: z.url(),
    portfolioLink: z.url().optional(),
    ProfilePictureUrl: z.url().optional(),
});

export const adminSignUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must have atleast 6 characters").max(12, "Password should not be more than 12 characters"),
    CollegeName: z.string(),
    acceptedDomain: z.string(),
});