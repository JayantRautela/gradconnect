import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET (request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user.student;

        if (!user) {
            return Response.json({
                success: false,
                message: "Not Authenticated"
            }, 
            {
                status: 403
            });
        }

        const studentId = user.id;
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }, 
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        if (!student) {
            return Response.json({
                success: false,
                message: "Student not found"
            }, 
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Student profile fetched sucessfully",
            student,
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error fetching student profile :- ${error}`);
        return Response.json({
            success: false,
            message: "Error fetching student profile"
        }, 
        {
            status: 500
        });
    }
}