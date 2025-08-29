import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const alumniRequest = await prisma.alumni.findMany({
            where: {
                isVerified: false
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
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        if (alumniRequest.length === 0) {
            return Response.json({
                success: false,
                message: "No verification request found"
            }, 
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Alumni verification request recieved",
            alumniRequest
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching alumni request :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in fetching alumni request"
        }, 
        {
            status: 500
        });
    }
}