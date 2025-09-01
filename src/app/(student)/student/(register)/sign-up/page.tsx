"use client";
import { studentSignUpSchema } from "@/schemas/singUpSchema";
import { StudentSignUpResponse } from "@/types/ApiResponse";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function StudentSignUp () {
    const courses = ["BTECH", "MTECH", "BCA", "MCA", "BSC", "MSC", 'MBBS', "BBA", "MBA", "PHD", "BPHARMA", "MPHARMA", "BVOC", "MVOC"];
    const year = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof studentSignUpSchema>>({
        resolver: zodResolver(studentSignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            course: "BTECH",
            branch: "",
            collegeName: "",
            currentYear: "FIRST",  
            name: "",
            isVerified: false,
            profilePhoto: undefined,
        }
    });

    const onSubmit = async (data: z.infer<typeof studentSignUpSchema>) => {
        if (data.name.trim().length === 0 || data.branch.trim().length === 0 || data.collegeName.trim().length === 0) {
            toast.error("All Field are required");
            return;
        }
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("collegeName", data.collegeName);
            formData.append("branch", data.branch);
            formData.append("course", data.course);
            formData.append("password", data.password);
            formData.append("currentYear", data.currentYear);
            formData.append("profilePhoto", data.profilePhoto);
            const response = await axios.post<StudentSignUpResponse>('/api/student/sign-up', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            });
            const message = response.data.message;
            const userId = response.data.userId;
            toast.success(message);
            router.replace(`/student/verify/${userId}`);
        } catch (error) {
            const axiosError = error as AxiosError<StudentSignUpResponse>;
            const message = axiosError.response?.data.message || "Some Error Occured!";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            form.reset({ email: "", password: "", course: "BTECH", branch: "", currentYear: "FIRST", collegeName: "", name: "", profilePhoto: ""});
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
                            <FormLabel>Email (Use College Official Email Id only)</FormLabel>
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
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="john doe"
                                    type="text"
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
                    name="profilePhoto" 
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
                                        form.setValue("profilePhoto", file); 
                                        }
                                    }}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="collegeName"
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
                    <div className="flex gap-5">
                        <FormField
                        name="currentYear"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your year" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {year.map((year) => (
                                        <SelectItem key={year} value={year}>
                                        {year}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="course"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course} value={course}>
                                        {course}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="branch"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch</FormLabel>
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
                    </div>
                    
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