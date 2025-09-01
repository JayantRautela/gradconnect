'use client';
import { adminSignUpSchema } from "@/schemas/singUpSchema";
import { AdminSignUpResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
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


export default function AdminSignUp () {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof adminSignUpSchema>>({
        resolver: zodResolver(adminSignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            CollegeName: "",
            acceptedDomain: "",
            collegeLogo: undefined,
        }
    });

    const onSubmit = async (data: z.infer<typeof adminSignUpSchema>) => {
        if (!data.collegeLogo) {
            toast.error("College Logo is Required");
            return;
        }
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("acceptedDomain", data.acceptedDomain);
            formData.append("CollegeName", data.CollegeName);
            formData.append("collegeLogo", data.collegeLogo);
            const response = await axios.post<AdminSignUpResponse>('/api/admin/sign-up', 
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-Data' }
                }
            );
            const message = response.data.message;
            toast.success(message);
            router.replace('/sign-in');
        } catch (error) {
            const axiosError = error as AxiosError<AdminSignUpResponse>;
            const message = axiosError.response?.data.message || "Some Error occured!";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            form.reset({ email: "", password: "", acceptedDomain: "", CollegeName: "", collegeLogo: undefined});
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-m">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Join GradConnect
                </h1>
                <p className="mb-4">Sign up</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="john10@abc.com"
                                    type="email"
                                    {...field} 
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="password"
                                    {...field}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="collegeLogo" 
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Photo</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            form.setValue("collegeLogo", file); 
                                        }
                                    }}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="acceptedDomain"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Accepted Domain</FormLabel>
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
                    name="CollegeName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College Name</FormLabel>
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
                <div className="text-center mt-4">
                <p>
                    Already a member?{' '}
                    <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                    Sign in
                    </Link>
                </p>
                </div>
            </div>
        </div>
    )
}