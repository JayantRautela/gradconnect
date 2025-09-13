import { Mode } from "@prisma/client";
import {  z } from "zod";

export const createEventSchema = z.object({
    title: z.string("Title cannot be empty").length(100, "Title cannot be of more than 100 characters"),
    place: z.string("Event place cannot be empty").length(100, "Event place cannot be of more than 100 characters"),
    time: z.string("Time cannot be empty"),
    description: z.string("Description cannot be empty").length(1000, "Description cannot be of more than 1000 characters"),
    mode: z.enum(Mode),
    file: z.string()
});