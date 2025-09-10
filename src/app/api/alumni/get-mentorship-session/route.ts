import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET (request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const alumni = session?.user.alumni;

        if (!alumni) {
            return Response.json({
                success: false,
                message: "Alumni not found"
            }, 
            {
                status: 404
            });
        }
        const now = new Date().toISOString().slice(0, 16);


        const upcomingSessions = await prisma.mentorship.findMany({
            where: {
                alumniId: alumni.id,
                time: { gt: now },
            },
            include: { participants: true },
            orderBy: { time: "asc" },
        });

        const pastSessions = await prisma.mentorship.findMany({
            where: {
                alumniId: alumni.id,
                time: { lt: now },
            },
            include: { participants: true },
            orderBy: { time: "desc" },
        });

        return Response.json({
            success: true,
            message: "Mentorship sessions fetched successfully",
            upcoming: upcomingSessions,
            past: pastSessions,
        },
        { 
            status: 200 
        });
    } catch (error) {
        console.error(`Error in fetching mentorship sessions :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in fetching mentorship sessions"
        }, 
        {
            status: 500
        });
    }
}