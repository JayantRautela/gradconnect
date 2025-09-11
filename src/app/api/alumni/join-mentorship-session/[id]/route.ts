import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const session = await getServerSession(authOptions);
        const student = session?.user.student;

        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, 
            {
                status: 403
            });
        }

        const mentorshipSession = await prisma.mentorship.findUnique({
            where: {
                id: id
            },
            include: {
                participants: true
            }
        });

        if (!mentorshipSession) {
            return NextResponse.json({
                success: false,
                message: "Mentorship session not found"
            }, 
            {
                status: 404
            });
        }

        if (mentorshipSession.participants.length >= mentorshipSession.maxParticipant) {
            return NextResponse.json({
                success: false,
                message: "Session is full"
            }, 
            {
                status: 400
            });
        }

        await prisma.sessionParticipant.create({
            data: {
                sessionId: id,
                userId: student.id
            }
        });

        // send session link to email
        return NextResponse.json({
            success: false,
            message: "Event link shared",
            link: mentorshipSession.meetingUrl
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in joining :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in joining"
        }, 
        {
            status: 500
        });
    }
}