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
                message: "Cannot fetch User"
            },
            {
                status: 403
            });
        }

        const collegeName = user.admin?.collegeName || user.alumni?.collegeName || user.student?.collegeName;

        if (!collegeName) {
            return NextResponse.json({
                success: false,
                message: "Cannot get college name"
            },
            {
                status: 400
            });
        }

        const posts = await prisma.post.findMany({
            where: {
                author: {
                    OR: [{ admin: { CollegeName: collegeName } }, { alumni: { collegeName: collegeName } }]
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        role: true,
                        admin: { 
                            select: { 
                                id: true, 
                                CollegeName: true,
                                collegeLogo: true
                            } 
                        },
                        alumni: { 
                            select: { 
                            id: true, 
                            name: true, 
                            collegeName: true, 
                            ProfilePictureUrl: true
                            } 
                        }
                    }
                }
            },
            orderBy: { 
                createdAt: "desc"
            }
        });

        return NextResponse.json({
            success: true,
            message: posts.length === 0 ? "No post available" : "Posts fetched successfully",
            posts
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching posts :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching posts"
        }, 
        {
            status: 500
        });
    }
}