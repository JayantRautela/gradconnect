'use client';
import { createEventSchema } from "@/schemas/createEventSchema";
import { CreateEventResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Mode } from "@prisma/client";

export default function AddEventPage () {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof createEventSchema>>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title: "",
            place: "",
            time: "",
            description: "",
            mode: "OFFLINE",
            file: undefined
        }
    });

    const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("place", data.place);
        formData.append("time", data.time);
        formData.append("description", data.description);
        formData.append("mode", data.mode);
        formData.append("file", data.file);

        try {
            setIsSubmitting(true);
            const response = await axios.post<CreateEventResponse>('/api/admin/create-event',
                formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            const message = response.data.message;
            toast.success(message);
            router.push("/admin/dashboard/events");
        } catch (error) {
            const axiosError = error as AxiosError<CreateEventResponse>;
            const message = axiosError.response?.data.message || "Some Error occured";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen py-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-m">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Add Event
                </h1>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="Annual Fest"
                                    type="text"
                                    {...field} 
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="place"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Place</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="6th Floor, Main Hall, ABC College"
                                    type="text"
                                    {...field} 
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="time"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="datetime-local"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="text"
                                    {...field}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="mode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mode</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Mode.HYBRID}>{Mode.HYBRID}</SelectItem>
                                            <SelectItem value={Mode.ONLINE}>{Mode.ONLINE}</SelectItem>
                                            <SelectItem value={Mode.OFFLINE}>{Mode.OFFLINE}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="file"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Banner</FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.files)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <Button type="submit" className="cursor-pointer w-full" disabled={isSubmitting}>{
                    isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                        </>
                    ) : ( 'Add Event')
                    }
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    )
}