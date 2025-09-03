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
    profilePhoto: z.any(),
    rollNo: z.string(),
});

export const alumniSignUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must have atleast 6 characters").max(12, "Password should not be more than 12 characters"),
    course: z.enum(["BTECH", "MTECH", "BCA", "MCA", "BSC", "MSC", 'MBBS', "BBA", "MBA", "PHD", "BPHARMA", "MPHARMA", "BVOC", "MVOC"]),
    branch: z.string(),
    collegeName: z.string(),
    name: z.string(),
    phoneNumber: z.string().length(10, "Phone Number should be of 10 digits"),
    cgpa: z.number(),
    yearOfExperience: z.number(),
    currentCompany: z.string(),
    passoutYear: z.number(),
    isOpenToTakeMentorshipSession: z.enum(["Yes", "No"]),
    linkedinProfileUrl: z.url(),
    portfolioLink: z.url().optional(),
    profilePhoto: z.any(),
    rollNo: z.string(),
    currentPosition: z.string(),
});

export const adminSignUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must have atleast 6 characters").max(12, "Password should not be more than 12 characters"),
    CollegeName: z.string(),
    acceptedDomain: z.string(),
    collegeLogo: z.any(),
});