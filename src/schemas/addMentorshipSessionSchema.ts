import { z } from "zod";

export const addMentorshipSessionSchema = z.object({
    meetingUrl: z.url(),
    time: z.string().refine(
    (val) => !isNaN(Date.parse(val)), 
        { message: "Invalid date & time" }
    ),
    title: z.string("title cannot be empty").max(100, "title cannot be of more than 100 characters"),
    maxParticipant: z.number()
})