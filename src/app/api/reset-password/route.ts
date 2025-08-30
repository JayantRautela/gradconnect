import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST reuqest to check the OTP
// PATCH request to change the password

export async function POST (request: Request) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return Response.json({
                success: false,
                message: "All fields are required"
            },
            {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
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

        if (user.resetPasswordCode !== otp) {
            return Response.json({
                success: false,
                message: "Inncorrect OTP"
            },
            {
                status: 400
            });
        }

        return Response.json({
            success: true,
            message: "OTP verified, you can change your password"
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in Checking OTP :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in Checking OTP"
        },
        {
            status: 500
        });
    }
}

export async function PATCH (request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return Response.json({
                success: false,
                message: "All fields are required"
            },
            {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
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

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        });

        return Response.json({
            success: true,
            message: "Password changed successfully"
        },
        {
            status: 200
        });
    } catch (error) {
        console.error(`Error in Reseting Password :- ${error}`);
        return Response.json({
            success: false,
            message: "Error in Reseting Password"
        },
        {
            status: 500
        });
    }
}