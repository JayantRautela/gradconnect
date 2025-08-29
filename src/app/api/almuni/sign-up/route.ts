import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";


export async function POST (request: Request) {
    try { 
        // cgpa is decimal
        // isOpenToTakeMentorshipSession is a radio group
        // course is going to be a radio group
        // passoutYear is going to be a input of year
        // yearOfExperience is decimal
        const { name, email, phoneNumber, cgpa, currentCompany, yearOfExperience, passoutYear, isOpenToTakeMentorshipSession, branch, course, password } = await request.json();

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
                        currentCompany,
                        yearOfExperience: new Prisma.Decimal(yearOfExperience),
                        passoutYear,
                        isOpenToTakeMentorshipSession: mentorship,
                        branch,
                        course,
                        isVerified: false,
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