import { prisma } from "@/lib/prisma";


export async function GET (request: Request) {
    try {
        const years = await prisma.alumni.findMany({
            distinct: ["passoutYear"],
            select: { 
                passoutYear: true 
            },
            orderBy: { 
                passoutYear: "asc" 
            }, 
        });

        if (years.length === 0) {
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
            message: "passout year fetched",
            years: years.map((y) => y.passoutYear) 
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching passout year :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in fetching passout year"
        }, 
        {
            status: 500
        });
    }
}