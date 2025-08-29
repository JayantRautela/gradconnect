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

        const existingStudent = await prisma.student.findFirst({
            where: {
                email: email,
            }
        });

        if (existingStudent) {
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

        const user = await prisma.student.create({
            data: {
                name: name as string,
                email: email as string,
                course: course,
                branch: branch as string,
                password: hashedPassword,
                currentYear: currentYear,
                verifyCode: otp,
                isVerified: false
            }
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