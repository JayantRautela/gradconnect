import { prisma } from "@/lib/prisma";
import { Course, Year } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse, NextRequest } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST (request: NextRequest) {
    try {
        // course is going to be a radio group
        // current year is also going to be a radio group
        // const { name, email, course, branch, password, currentYear, collegeName } = await request.json();
        const formData = await request.formData();
        
        const file = formData.get("profilePhoto") as File | null;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const course = formData.get("course") as Course;
        const branch = formData.get("branch") as string;
        const password = formData.get("password") as string;
        const collegeName = formData.get("collegeName") as string;
        const currentYear = formData.get("currentYear") as Year;
        const rollNo = formData.get("rollNo") as string;

        const normalizedCollege = collegeName.trim().toLowerCase();

        const admin = await prisma.admin.findFirst({
            where: {
                CollegeName: normalizedCollege
            },
            select: { 
                acceptedDomain: true 
            }
        });

        if (!admin) {
            return NextResponse.json({ 
                success: false, 
                message: "College Not Found" 
            }, 
            { 
                status: 404 
            });
        }

        const acceptedDomain = admin.acceptedDomain;

        if (!email.toLowerCase().endsWith(`@${acceptedDomain.trim().toLowerCase()}`)) {
            return NextResponse.json({
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
            return NextResponse.json({
                success: false,
                message: "Student with email already exists"
            },
            {
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        let profilePhotoUrl: string | null = null;
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "student-profiles" }, (err, result) => {
                if (err || !result) reject(err);
                else resolve(result as { secure_url: string });
                }).end(buffer);
            });
            profilePhotoUrl = uploadResult.secure_url;
        }

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
                        collegeName: collegeName,    
                        isVerified: false, 
                        ProfilePictureUrl: profilePhotoUrl,
                        rollNo: rollNo.trim().toLowerCase()
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
        return NextResponse.json({
            success: false,
            message: "Error registering student"
        },
        {
            status: 500
        });
    }
}