import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Event Id is required"
            },
            {
                status: 400
            });
        }

        const event = await prisma.event.findUnique({
            where: {
                id: id
            },
            include: {
                createdBy: true
            }
        });

        if (!event) {
            return NextResponse.json({
                success: false,
                message: "Event Not Found"
            }, 
            {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Event detail fetched successfully",
            event: event
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching events details :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching events details"
        },
        {
            status: 500
        });
    }
}