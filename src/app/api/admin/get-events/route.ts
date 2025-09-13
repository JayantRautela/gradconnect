import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, 
            {
                status: 401
            });
        }

        const admin = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }, 
            include: {
                admin: true
            }
        });

        if (!admin?.admin) {
            return NextResponse.json({ 
                success: false, 
                message: "Admin not found" 
            },
            { 
                status: 404 
            });
        }

        const now = new Date();

        const pastEvents = await prisma.event.findMany({
        where: {
            adminId: admin.admin.id,
            time: { 
                lt: now
            },
        },
        orderBy: { 
                time: "desc"
            },
        });

        const upcomingEvents = await prisma.event.findMany({
        where: {
            adminId: admin.admin.id,
            time: { 
                gte: now 
            },
        },
        orderBy: { 
            time: "asc" 
        },
        });

        return NextResponse.json(
        {
            success: true,
            message: "Events fetched successfully",
            pastEvents,
            upcomingEvents,
        },
        { 
            status: 200 
        });
    } catch (error) {
        console.error(`Error fetching events: ${error}`);
        return NextResponse.json({ 
            success: false, 
            message: "Error fetching events" 
        },
        { 
            status: 500 
        });
    }
}
