import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        // example request :- /api/admin/alumni/[id] 
        // this is when the admin after clicking on the passout card on the dashboard again clicks on the alumni so this route to get ther data.
        // and also when the admin wants to see the details of the alumni while approving the request.
        // const alumniId = params.id;
        const { id } = await context.params;
        const alumniId = id;

        if (!alumniId) {
            return NextResponse.json({
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
            return NextResponse.json({
                success: false,
                message: "Alumni not found"
            },
            {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "ALumni data fetched successfully",
            alumni: alumni
        }, 
        {
            status: 200
        })
    } catch (error) {
        console.error(`Error in fetching alumni data :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching alumni data"
        }, 
        {
            status: 500
        });
    }
}