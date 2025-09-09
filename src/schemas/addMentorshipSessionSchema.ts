import { z } from "zod";

export const addMentorshipSessionSchema = z.object({
    meetingUrl: z.url(),
    time: z.string(),
    title: z.string("title cannot be empty").max(100, "title cannot be of more than 100 characters"),
    maxParticipant: z.number()
})