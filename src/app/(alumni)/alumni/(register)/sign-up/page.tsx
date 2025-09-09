'use client';
import { alumniSignUpSchema } from "@/schemas/singUpSchema";
import { AlumniSignUpResponse } from "@/types/ApiResponse";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AlumniSignUpPage () {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const courses = ["BTECH", "MTECH", "BCA", "MCA", "BSC", "MSC", 'MBBS', "BBA", "MBA", "PHD", "BPHARMA", "MPHARMA", "BVOC", "MVOC"];
    const router = useRouter();

    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let y = currentYear; y >= 1980; y--) {
        years.push(y);
    }

    const form = useForm<z.infer<typeof alumniSignUpSchema>>({
        resolver: zodResolver(alumniSignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            cgpa: 0.0,
            currentCompany: "",
            collegeName: "",
            yearOfExperience: 0.0,
            passoutYear: 0,
            isOpenToTakeMentorshipSession: "Yes",
            linkedinProfileUrl: "",
            portfolioLink: "",
            branch: "",
            course: "BTECH",
            password: "",
            profilePhoto: undefined,
            rollNo: "",
            currentPosition: ""
        }
    });

    const radioGroupValue = (data: z.infer<typeof alumniSignUpSchema>): boolean => {
        return data.isOpenToTakeMentorshipSession === "Yes";
    }

    const onSubmit = async (data: z.infer<typeof alumniSignUpSchema>) => {
        if (data.name.trim().length === 0 || data.branch.trim().length === 0 || data.collegeName.trim().length === 0 || data.linkedinProfileUrl.trim().length === 0 || data.currentCompany.trim().length === 0 || data.phoneNumber.trim().length === 0) {
            toast.error("All Field are required");
            return;
        }

        if (data.passoutYear > currentYear) {
            toast.error("Enter a valid passout year");
            return;
        }

        if (data.cgpa <= 0) {
            toast.error("Enter a valid CGPA");
            return;
        }
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("cgpa", data.cgpa.toString());
            formData.append("currentCompany", data.currentCompany);
            formData.append("collegeName", data.collegeName);
            formData.append("yearOfExperience", data.yearOfExperience.toString());
            formData.append("passoutYear", data.passoutYear.toString());
            formData.append("isOpenToTakeMentorshipSession", radioGroupValue(data).toString());
            formData.append("linkedinProfileUrl", data.linkedinProfileUrl);
            formData.append("portfolioLink", data.portfolioLink as string);
            formData.append("branch", data.branch);
            formData.append("course", data.course);
            formData.append("password", data.password);
            formData.append("rollNo", data.rollNo);
            formData.append("currentPosition", data.currentPosition);

            if (data.profilePhoto) {
            formData.append("profilePhoto", data.profilePhoto);
            }
            const response = await axios.post<AlumniSignUpResponse>('/api/alumni/sign-up', 
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            const message = response.data.message;
            toast.success(message);
            router.replace(`/alumni/wait/${data.name}`);
        } catch (error) {
            const axiosError = error as AxiosError<AlumniSignUpResponse>;
            const message = axiosError.response?.data.message || "Some Error Occured!";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
            form.reset({
                name: "",
                email: "",
                phoneNumber: "",
                cgpa: 0.0,
                currentCompany: "",
                collegeName: "",
                yearOfExperience: 0.0,
                passoutYear: 0,
                isOpenToTakeMentorshipSession: "Yes",
                linkedinProfileUrl: "",
                portfolioLink: "",
                branch: "",
                course: "BTECH",
                password: "",
                profilePhoto: undefined,
                rollNo: "",
                currentPosition: ""
            });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 py-4">
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
                    name="rollNo"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College Roll No</FormLabel>
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
                    <FormField
                    name="cgpa"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CGPA</FormLabel>
                                <FormControl>
                                    <Input  
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input  
                                    type="tel"
                                    {...field}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex gap-5">
                        <FormField
                            name="currentCompany"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Company</FormLabel>
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
                            name="currentPosition"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Position</FormLabel>
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
                    <FormField
                            name="yearOfExperience"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Years Of Experience (only number)</FormLabel>
                                        <FormControl>
                                            <Input  
                                            type="number"
                                            step="0.1"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField 
                        name="isOpenToTakeMentorshipSession"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Are You Open to take Mentorship session</FormLabel>
                                <FormControl>
                                    <RadioGroup 
                                        onValueChange={field.onChange} 
                                        value={field.value}       
                                        className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Yes" id="Yes" />
                                            <Label htmlFor="Yes">Yes</Label>

                                            <RadioGroupItem value="No" id="No" />
                                            <Label htmlFor="No">No</Label>
                                        </div>
                                        </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-5">
                        <FormField
                        name="passoutYear"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passout Year</FormLabel>
                                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={field.value.toString()}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your passout year" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
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

                    <div className="flex gap-5">
                        <FormField
                        name="linkedinProfileUrl"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn Profile Url</FormLabel>
                                    <FormControl>
                                        <Input  
                                        type="url"
                                        {...field}
                                        />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="portfolioLink"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Portfolio Link (Optional)</FormLabel>
                                    <FormControl>
                                        <Input  
                                        type="url"
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