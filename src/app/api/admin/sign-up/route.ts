import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { collegeName, email, acceptedDomain, password } = await request.json();

        const college = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (college) {
            return Response.json({
                success: false,
                message: "College already exists"
            }, 
            {
                status: 400
            });
        }

        const normalizedCollege = collegeName.trim().toLowerCase();
        const normalizedDomain = acceptedDomain.trim().toLowerCase();
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "ADMIN",
                admin: {
                    create: {
                        CollegeName: normalizedCollege,
                        acceptedDomain: normalizedDomain,
                    }
                }
            },
            include: {
                admin: true
            }
        });

        return Response.json({
            success: true,
            message: "College Registered Successfully"
        }, 
        {
            status: 201
        });
    } catch (error) {
        console.error(`Error registering ADMIN :- ${error}`);
        return Response.json({
            success: false,
            message: "Error registering ADMIN"
        }, 
        {
            status: 500
        });
    }
}