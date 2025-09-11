import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request: NextRequest) {
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
            return NextResponse.json({
                success: false,
                message: "No alumni found"
            }, 
            {
                status: 404
            }); 
        }

        return NextResponse.json({ 
            success: true,
            message: "passout year fetched",
            years: years.map((y) => y.passoutYear) 
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching passout year :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching passout year"
        }, 
        {
            status: 500
        });
    }
}