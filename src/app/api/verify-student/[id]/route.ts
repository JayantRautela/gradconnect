import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string }}) {
    try {
        const { otp } = await request.json();
        const userId = params.id;

        const user = await prisma.student.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            },
            {
                status: 404
            });
        }

        const verifyCode = user.verifyCode;

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
                id: userId
            },
            data: {
                isVerified: true
            }
        });

        return  Response.json({
            success: true,
            message: "User registered successfully"
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