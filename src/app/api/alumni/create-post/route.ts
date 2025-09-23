import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST (request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const alumni = session?.user.alumni;

        if (!alumni || session.user.role !== "ALUMNI") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized form creating a post"
            },
            {
                status: 403
            });
        }

        const { content } = await request.json();

        await prisma.post.create({
            data: {
                content: content,
                author: {
                    connect: {
                        id: alumni.id
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Post created successfully"
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in cresting a post :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in creating POST"
        },
        {
            status: 500
        });
    }
}