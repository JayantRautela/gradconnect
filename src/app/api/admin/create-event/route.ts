import { prisma } from "@/lib/prisma";
import { Mode } from "@prisma/client";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST (request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const admin = session?.user.admin;

        if (!admin) {
            console.log("I am throwing unauthorized from route");
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            },
            {
                status: 403
            });
        }

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const place = formData.get("place") as string;
        const time = new Date(formData.get("time") as string);
        const description = formData.get("description") as string;
        const mode = formData.get("mode") as Mode;
        const file = formData.get("file") as File | null

        let eventBannerUrl: string = "";
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "event-banner" }, (err, result) => {
                    if (err || !result) reject(err);
                    else resolve(result as { secure_url: string });
                }).end(buffer);
            });
            eventBannerUrl = uploadResult.secure_url;
        }

        const event = await prisma.event.create({
            data: {
                title: title,
                description: description,
                time: time,
                place: place,
                mode: mode,
                eventBannerUrl: eventBannerUrl,
                adminId: admin.id
            },
            include: {
                createdBy: true
            }
        });

        // add queue to send email to all alumni

        return NextResponse.json({
            success: true,
            message: "Event created successfully",
            event: event
        },
        {
            status: 201
        });
    } catch (error) {
        console.error(`Error in creating event :- ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in creating event"
        }, 
        {
            status: 500
        });
    }
}