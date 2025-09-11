import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";

export async function GET (request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user.alumni;

        if (!user) {
            return NextResponse.json({
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
            return NextResponse.json({
                success: false,
                message: "alumni not found"
            }, 
            {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "alumni profile fetched sucessfully",
            alumni,
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error fetching alumni profile :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error fetching alumni profile"
        }, 
        {
            status: 500
        });
    }
}