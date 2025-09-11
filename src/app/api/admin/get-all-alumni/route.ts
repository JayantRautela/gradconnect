import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
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
            return NextResponse.json(
            { 
                success: false, 
                message: "Admin not found" 
            },
            { 
                status: 404 
            });
        }

        // example request :- fetch(`/api/alumni?passoutYear=2022`);
        // this when admin click on one of the card in the dashboard.
        const { searchParams } = new URL(request.url);
        const passoutYear = searchParams.get("passoutYear"); 

        if (!passoutYear) {
            return NextResponse.json({
                success: false,
                message: "Passout Year is required"
            },
            {
                status: 400
            });
        }

        const alumni = await prisma.alumni.findMany({
            where: {
                passoutYear: Number(passoutYear),
                collegeName: admin.admin.CollegeName,
                // isVerified: true
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Alumni fetched successfully",
            alumni: alumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching alumnis :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching alumnis"
        },
        {
            status: 500
        });
    }
}