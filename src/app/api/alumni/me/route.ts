import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET (request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user.alumni;

        if (!user) {
            return Response.json({
                success: false,
                message: "Not Authenticated"
            }, 
            {
                status: 403
            });
        }

        const alumniId = user.id;
        const alumni = await prisma.alumni.findUnique({
            where: {
                id: alumniId
            }, 
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        if (!alumni) {
            return Response.json({
                success: false,
                message: "alumni not found"
            }, 
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "alumni profile fetched sucessfully",
            alumni,
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error fetching alumni profile :- ${error}`);
        return Response.json({
            success: false,
            message: "Error fetching alumni profile"
        }, 
        {
            status: 500
        });
    }
}