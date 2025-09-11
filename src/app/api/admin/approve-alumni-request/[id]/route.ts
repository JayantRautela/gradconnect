import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Alumni ID is required"
            }, 
            { 
                status: 400 
            });
        }

        const alumni = await prisma.alumni.findUnique({
            where: {
                id: id
            }
        });

        if (!alumni) {
            return NextResponse.json({
                success: false,
                message: "Alumni not found"
            }, 
            {
                status: 404
            });
        }

        const updatedAlumni = await prisma.alumni.update({
            where: {
                id: id
            },
            data: {
                isVerified: true
            },
            include: {
                user: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Alumni verified and sucessfully added",
            data: updatedAlumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in updating verification status :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in updating verification status"
        },
        {
            status: 500
        });
    }
}

export async function DELETE (request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Alumni ID is required"
            }, 
            { 
                status: 400 
            });
        }

        const alumni = await prisma.alumni.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            }
        });

        if (!alumni) {
            return NextResponse.json({
                success: false,
                message: "Alumni not found"
            }, 
            {
                status: 404
            });
        }

        const deletedAlumni  = await prisma.alumni.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({
            success: true,
            message: "Alumni request rejected and deleted",
            data: deletedAlumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in updating verification status :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in updating verification status"
        },
        {
            status: 500
        });
    }
}