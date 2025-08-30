import { prisma } from "@/lib/prisma";

export async function GET (request: Request, { params }: { params: { id: string }}) {
    try {
        // example request :- /api/admin/alumni/[id]
        const alumniId = params.id;

        if (!alumniId) {
            return Response.json({
                success: false,
                message: "ALumni ID is required"
            }, 
            {
                status: 400
            });
        }

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
                message: "Alumni not found"
            },
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "ALumni data fetched successfully",
            alumni: alumni
        }, 
        {
            status: 200
        })
    } catch (error) {
        console.error(`Error in fetching alumni data :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in fetching alumni data"
        }, 
        {
            status: 500
        });
    }
}