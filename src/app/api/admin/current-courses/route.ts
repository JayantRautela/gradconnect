import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request: NextRequest) {
    try {
        const courses = await prisma.student.findMany({
            distinct: ["course"],
            select: { 
                course: true 
            } 
        });

        if (courses.length === 0) {
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
            courses: courses.map((y) => y.course) 
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in fetching course :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in fetching course"
        }, 
        {
            status: 500
        });
    }
}