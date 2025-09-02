import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Course, Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export async function POST (request: Request) {
    try { 
        // cgpa is decimal
        // isOpenToTakeMentorshipSession is a radio group
        // course is going to be a radio group
        // passoutYear is going to be a input of year
        // yearOfExperience is decimal
        const formData = await request.formData();

        const file = formData.get("profilePhoto") as File | null;

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const cgpa = formData.get("cgpa") as string;
        const currentCompany = formData.get("currentCompany") as string;
        const collegeName = formData.get("collegeName") as string;
        const yearOfExperience = formData.get("yearOfExperience") as string;
        const passoutYear = Number(formData.get("passoutYear"));
        const isOpenToTakeMentorshipSession = formData.get("isOpenToTakeMentorshipSession") as string;
        const linkedinProfileUrl = formData.get("linkedinProfileUrl") as string;
        const portfolioLink = formData.get("portfolioLink") as string;
        const branch = formData.get("branch") as string;
        const course = formData.get("course") as string;
        const password = formData.get("password") as string;

        const normalizedCollegeName = collegeName.trim().toLowerCase();

        if (passoutYear > new Date().getFullYear()) {
            return Response.json({
                success: false,
                message: "Invalid Passout Year"
            }, 
            {
                status: 400
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                CollegeName: normalizedCollegeName
            }
        });

        if (!admin) {
            return Response.json({
                success: false,
                message: "College Does not exists"
            }, 
            {
                status: 400
            });
        }

        const alumni = await prisma.user.findUnique({
            where: {
                email: email
            }
        });


        if (alumni) {
            return Response.json({
                success: false,
                message: "Almuni already exists"
            },
            { 
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const mentorship = isOpenToTakeMentorshipSession === "true";

        let profilePhotoUrl: string | null = null;
        if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "alumni-profiles" }, (err, result) => {
            if (err || !result) reject(err);
            else resolve(result as { secure_url: string });
            }).end(buffer);
        });
        profilePhotoUrl = uploadResult.secure_url;
        }

        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "ALUMNI",
                alumni: {
                    create: {
                        name,
                        phoneNumber,
                        cgpa: new Prisma.Decimal(cgpa),
                        collegeName: collegeName,
                        currentCompany,
                        yearOfExperience: new Prisma.Decimal(yearOfExperience),
                        passoutYear,
                        isOpenToTakeMentorshipSession: mentorship,
                        branch,
                        linkedinProfileUrl,
                        portfolioLink,
                        course: course as Course,
                        isVerified: false,
                        ProfilePictureUrl: profilePhotoUrl
                    }
                }
            },
            include: {
                alumni: true, 
            },
        });

        return Response.json({
            success: true,
            message: "Your request is initiated, wait for admin to approve"
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in registering ALMUNI :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in registering ALMUNI"
        }, 
        {
            status: 500
        });
    }
}