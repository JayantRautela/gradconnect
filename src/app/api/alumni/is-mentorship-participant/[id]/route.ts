import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized" 
            },
            { 
                status: 401 
            });
        }

        const userId = session.user.student?.id; 
        const sessionId = (await context.params).id;

        if (!userId) {
            
        }

        const mentorshipSession = await prisma.mentorship.findUnique({
            where: { 
                id: sessionId 
            },
            select: { 
                participants: true 
            },
        });

        if (!mentorshipSession) {
            return NextResponse.json({ 
                success: false, 
                message: "Session not found" 
            },
            { 
                status: 404
            });
        }

        const alreadyJoined = mentorshipSession.participants.some(
            (participant) => participant.userId === userId
        );

        return NextResponse.json(
        {
            success: true,
            message: alreadyJoined ? "User has already joined this session" : "User has not joined this session",
            alreadyJoined,
        },
        { 
            status: 200 
        });
    } catch (error) {
        console.error(`Error in fetching participants :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching participants"
        },
        {
            status: 500
        });
    }
}