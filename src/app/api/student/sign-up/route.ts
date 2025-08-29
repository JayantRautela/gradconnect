import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST (request: Request) {
    try {
        // course is going to be a radio group
        // current year is also going to be a radio group
        const { name, email, course, branch, password, currentYear } = await request.json();

        const admin = await prisma.admin.findFirst({
            select: { 
                acceptedDomain: true 
            }
        });

        if (!admin) {
            return Response.json({ 
                success: false, 
                message: "Admin settings not found" 
            }, 
            { 
                status: 500 
            });
        }

        const acceptedDomain = admin.acceptedDomain;

        if (!email.toLowerCase().endsWith(`@${acceptedDomain.toLowerCase()}`)) {
            return Response.json({
                success: false,
                message: "Invalid Email. Enter your official College Email Id"
            },
            {
                status: 400
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return Response.json({
                success: false,
                message: "Student with email already exists"
            },
            {
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: "STUDENT",
                student: {
                    create: {
                        name,
                        course,
                        branch,
                        currentYear,
                        verifyCode: otp,       
                        isVerified: false, 
                    },
                },
            },
            include: {
                student: true,
            },
        });

        //send verification otp email

        return Response.json({
            success: true,
            message: "Verification OTP sent.",
            userId: user.id
        },
        {
            status: 200
        })
    } catch (error) {
        console.error(`Error in registering student :- ${error}`);
        return Response.json({
            success: false,
            message: "Error registering student"
        },
        {
            status: 500
        });
    }
}