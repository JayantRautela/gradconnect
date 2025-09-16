import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET (request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, 
            {
                status: 403
            });
        }

        const id = user.id;

        const studentOralumni = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                student: true,
                alumni: true
            }
        })

        const collegeName = studentOralumni?.student?.collegeName || studentOralumni?.alumni?.collegeName;

        if (!collegeName) {
            return NextResponse.json({
                success: false,
                message: "No college found"
            }, 
            { 
                status: 404 
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                CollegeName: collegeName.trim().toLowerCase()
            },
            include: {
                events: true
            }
        });

        const events = admin?.events;

        return NextResponse.json({
            success: true,
            message: "Events fetched successfully",
            events: events
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching events :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching events"
        },
        {
            status: 500
        });
    }
}