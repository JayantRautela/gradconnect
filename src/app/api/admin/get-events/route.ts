import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function GET(request: Request) {
    try {
        const session = await getServerSession();
        const admin = session?.user.admin;

        if (!admin) {
        return Response.json({ 
            success: false, 
            message: "Unauthorized" 
        },
        { 
            status: 403 
        });
        }

        const now = new Date();

        const pastEvents = await prisma.event.findMany({
        where: {
            adminId: admin.id,
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
            adminId: admin.id,
            time: { 
                gte: now 
            },
        },
        orderBy: { 
            time: "asc" 
        },
        });

        return Response.json(
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
        return Response.json({ 
            success: false, 
            message: "Error fetching events" 
        },
        { 
            status: 500 
        });
    }
}
