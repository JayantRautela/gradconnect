import { prisma } from "@/lib/prisma";

export async function GET (request: Request) {
    try {
        // example request :- fetch(`/api/alumni?passoutYear=2022`);
        const { searchParams } = new URL(request.url);
        const passoutYear = searchParams.get("passoutYear"); 

        if (!passoutYear) {
            return Response.json({
                success: false,
                message: "Passout Year is required"
            },
            {
                status: 400
            });
        }

        const alumni = await prisma.alumni.findMany({
            where: {
                passoutYear: Number(passoutYear)
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

        if (alumni.length === 0) {
            return Response.json({
                success: false,
                message: "No alumni found"
            },
            {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Alumni fetched successfully",
            alumni: alumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching alumnis :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in fetching alumnis"
        },
        {
            status: 500
        });
    }
}