import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { studentId: string }}) {
    try {
        // const studentId = params.studentId;
        const { studentId } = await params;
        const { otp } = await request.json();
        console.log(studentId);

        const student = await prisma.user.findUnique({
            where: {
                id: studentId
            },
            include: {
                student: true
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

        const verifyCode = student.student?.verifyCode;

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
                id: student.student?.id
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