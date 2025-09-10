import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const student = session?.user.student;

        if (!student) {
        return Response.json(
            { success: false, message: "Student not found" },
            { status: 404 }
        );
        }

        const now = new Date().toISOString().slice(0, 16);

        const upcomingSessions = await prisma.mentorship.findMany({
        where: {
            createdBy: {
                collegeName: student.collegeName
            },
            time: {
                gt: now
            }
        },
        include: {
            createdBy: true,       
            participants: true,  
        },
        orderBy: {
            time: "asc",
        },
        });

        return Response.json(
        {
            success: true,
            message: "Upcoming mentorship sessions fetched successfully",
            data: upcomingSessions,
        },
        { status: 200 }
        );
    } catch (error) {
        console.error(`Error in fetching student mentorship sessions :- ${error}`);
        return Response.json(
        { success: false, message: "Error in fetching mentorship sessions" },
        { status: 500 }
        );
    }
}
