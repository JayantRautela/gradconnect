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

        let collegeName = user.admin?.collegeName || user.student?.collegeName || "";

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
                CollegeName: collegeName
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