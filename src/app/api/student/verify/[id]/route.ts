import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string }}) {
    try {
        const { otp } = await request.json();
        const studentId = params.id;

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            return Response.json({
                success: false,
                message: "Student not found"
            },
            {
                status: 404
            });
        }

        const verifyCode = student.verifyCode;

        const isOtpCorrect = verifyCode === otp;

        if (!isOtpCorrect) {
            return Response.json({
                success: false,
                message: "Incorrect OTP"
            },
            {
                status: 400
            });
        }

        await prisma.student.update({
            where: {
                id: studentId
            },
            data: {
                isVerified: true,
            }
        });

        return  Response.json({
            success: true,
            message: "Student registered successfully"
        },
        {
            status: 201
        });
    } catch (error) {
        console.error(`Error in verifying student :- ${error}`);
        return Response.json({
            success: false,
            message: "Error verifying student"
        },
        {
            status: 500
        });
    }
}