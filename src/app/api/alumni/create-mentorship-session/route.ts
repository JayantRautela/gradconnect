import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST (request: Request) {
    try {
        const { meetingUrl, time, title, maxParticipant } = await request.json();

        const session = await getServerSession(authOptions);
        const alumni = session?.user.alumni;

        if (!alumni) {
            return Response.json({
                success: false,
                message: "Unauthenticated"
            }, 
            {
                status: 403
            });
        }

        const mentorshipSession = await prisma.mentorship.create({
            data: {
                time: time,
                title: title,
                maxParticipant: maxParticipant,
                meetingUrl: meetingUrl,
                alumniId: alumni.id
            }
        });

        return Response.json({
            success: true,
            message: "Mentorship session created successfully",
            mentorshipSession
        }, 
        {
            status: 201
        });
    } catch (error) {
        console.error(`Error creating mentorship session :- ${error}`);
        return Response.json({
            success: false,
            message: "Error creating mentorship session"
        }, 
        {
            status: 500
        });
    }
} 