import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, 
            {
                status: 401
            });
        }

        const admin = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }, 
            include: {
                admin: true
            }
        });

        if (!admin?.admin) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Admin not found" 
                },
                { 
                    status: 404 
                });
        }

        const alumniRequest = await prisma.alumni.findMany({
            where: {
                isVerified: false,
                collegeName: admin.admin.CollegeName
            },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                cgpa: true,
                currentCompany: true,
                yearOfExperience: true,
                passoutYear: true,
                branch: true,
                course: true,
                isOpenToTakeMentorshipSession: true,
                isVerified: true,
                ProfilePictureUrl: true,
                createdAt: true,
                linkedinProfileUrl: true,
                portfolioLink: true,
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: alumniRequest.length === 0 ? "No pending request" : "Pending Request fetched",
            alumniRequest,
            pendingRequest: alumniRequest.length
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching alumni request :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching alumni request"
        }, 
        {
            status: 500
        });
    }
}