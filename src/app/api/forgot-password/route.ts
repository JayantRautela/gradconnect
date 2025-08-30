import { prisma } from "@/lib/prisma";

export async function POST (request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return Response.json({
                success: false,
                message: "Email is required"
            },
            {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
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


        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                resetPasswordCode: otp
            }
        });
        
        //send otp for reset password to email.

        return Response.json({
            success: true,
            message: "Reset Password Code sent to email"
        }, 
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in forgot password :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in forgot password"
        },
        {
            status: 500
        });
    }
}