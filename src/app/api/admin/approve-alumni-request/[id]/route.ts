import { prisma } from "@/lib/prisma";

export async function PATCH (request: Request, { params }: { params: { id: string }}) {
    try {
        const id = params.id;

        if (!id) {
            return Response.json({
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
            return Response.json({
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

        return Response.json({
            success: true,
            message: "Alumni verified and sucessfully added",
            data: updatedAlumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in updating verification status :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in updating verification status"
        },
        {
            status: 500
        });
    }
}

export async function DELETE (request: Request, { params }: { params: { id: string}}) {
    try {
        const id = params.id;

        if (!id) {
            return Response.json({
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
            return Response.json({
                success: false,
                message: "Alumni not found"
            }, 
            {
                status: 404
            });
        }

        const deletedAlumni = await prisma.$transaction(async (tx) => {
            await tx.alumni.delete({ 
                where: { 
                    id 
                } 
            });

            if (alumni.userId) {
                await tx.user.delete({ where: { 
                    id: alumni.userId 
                } });
            }

            return alumni;
        });

        return Response.json({
            success: true,
            message: "Alumni request rejected and deleted",
            data: deletedAlumni
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in updating verification status :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in updating verification status"
        },
        {
            status: 500
        });
    }
}