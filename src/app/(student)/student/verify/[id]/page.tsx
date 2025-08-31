'use client'
import { studentVerifySchema } from "@/schemas/studentVerifySchema";
import { StudentVerifyResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
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
import { isCuid } from "cuid";

export default function StudentVerifyPage () {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const params = useParams<{ id: string}>();
    const studentId = params.id;

    if (!isCuid(studentId)) {
        return (
            <div className="flex justify-center items-center w-full h-screen bg-gray-100 flex-col gap-5">
                <p className="text-5xl font-bold">Invalid Student ID</p>
                <Button
                    onClick={() => router.replace('/student/sign-up')}
                    variant={'outline'}
                    className="cursor-pointer text-2xl"
                    size={'lg'}
                >
                    Sign Up
                </Button>
            </div>
        )
    }

    const form = useForm<z.infer<typeof studentVerifySchema>>({
        resolver: zodResolver(studentVerifySchema),
        defaultValues: {
            otp: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof studentVerifySchema>) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post<StudentVerifyResponse>(`/api/student/verify/${studentId}`, {
                otp: data.otp
            });
            const message = response.data.message;
            toast.success(message);
            router.replace('/feed');
        } catch (error) {
            const axiosError = error as AxiosError<StudentVerifyResponse>;
            const message = axiosError.response?.data.message || "Some Error Occured";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            form.reset({
                otp: ""
            });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-m">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Verify Yourself
                </h1>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    name="otp"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Code</FormLabel>
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
                    
                    <Button type="submit" className="cursor-pointer w-full" disabled={isSubmitting}>{
                    isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                        </>
                    ) : ( 'SignUp')
                    }
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    )
}