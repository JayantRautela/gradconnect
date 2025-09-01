import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET (request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user.admin;

        if (!user) {
            return Response.json({
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
            return Response.json({
                success: false,
                message: "Admin not found"
            }, 
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Admin profile fetched sucessfully",
            admin,
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error fetching admin profile :- ${error}`);
        return Response.json({
            success: false,
            message: "Error fetching admin profile"
        }, 
        {
            status: 500
        });
    }
}