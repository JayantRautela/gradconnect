import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user.admin;

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Not Authenticated"
            }, 
            {
                status: 403
            });
        }

        const adminId = user.id;
        const admin = await prisma.admin.findUnique({
            where: {
                id: adminId
            }, 
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "Admin not found"
            }, 
            {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Admin profile fetched sucessfully",
            admin,
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error fetching admin profile :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error fetching admin profile"
        }, 
        {
            status: 500
        });
    }
}