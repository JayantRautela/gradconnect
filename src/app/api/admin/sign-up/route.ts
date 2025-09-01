import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
    try {
        const form = await request.formData();

        const file = form.get("collegeLogo") as File | null;

        const collegeName = form.get("CollegeName") as string;
        const email = form.get("email") as string;
        const acceptedDomain = form.get("acceptedDomain") as string;
        const password = form.get("password") as string;

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

        let profilePhotoUrl: string = "";
            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: "college-logo" }, (err, result) => {
                    if (err || !result) reject(err);
                    else resolve(result as { secure_url: string });
                }).end(buffer);
                });
                profilePhotoUrl = uploadResult.secure_url;
            }

        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "ADMIN",
                admin: {
                    create: {
                        CollegeName: normalizedCollege,
                        acceptedDomain: normalizedDomain,
                        collegeLogo: profilePhotoUrl
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