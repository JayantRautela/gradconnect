'use client';
import { addMentorshipSessionSchema } from "@/schemas/addMentorshipSessionSchema";
import { MentroshipResponse } from "@/types/ApiResponse";
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';


export default function AddMentorshipSession () {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof addMentorshipSessionSchema>>({
        resolver: zodResolver(addMentorshipSessionSchema),
        defaultValues: {
            meetingUrl: "",
            time: "",
            title: "",
            maxParticipant: 0,
        }
    });


    const onSubmit = async (data: z.infer<typeof addMentorshipSessionSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post<MentroshipResponse>('/api/alumni/create-mentorship-session', {
                meetingUrl: data.meetingUrl, 
                time: data.time, 
                title: data.title, 
                maxParticipant: data.maxParticipant
            });
            const message = response.data.message;
            toast.success(message);
            router.push('/alumni/dashboard/mentorship');
        } catch (error) {
            const axiosError = error as AxiosError<MentroshipResponse>;
            const message = axiosError.response?.data.message || "Some Error Occured";
            toast.error(message);
        } finally {
            setIsLoading(false);
            form.reset({
                meetingUrl: "",
                time: "",
                title: "",
                maxParticipant: 0
            });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen py-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-m">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Add Session
                </h1>
                {/* <p className="mb-4">Sign up</p> */}
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
                                    placeholder="Resume Review"
                                    type="text"
                                    {...field} 
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="meetingUrl"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Url</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="https://meet.google.com/msy-hgrf-cfg"
                                    type="url"
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
                    name="maxParticipant"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Participant</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="number"
                                    min={1}
                                    {...field}
                                    onChange={(e) => field.onChange(+e.target.value)}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    
                    
                    <Button type="submit" className="cursor-pointer w-full" disabled={isLoading}>{
                    isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                        </>
                    ) : ( 'Add Session')
                    }
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    )
}