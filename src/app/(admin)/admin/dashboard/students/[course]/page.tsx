'use client'
import {  Student, GetStudentResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Eye, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

export default function AllAlumniPage () {
    const { course } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState<Student[]>();
    const [totalstudents, setTotalStudents] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<GetStudentResponse>(`/api/admin/get-all-students?course=${course}`);
                const message = response.data.message;
                toast.success(message);
                setStudents(response.data.student);
                setTotalStudents(response.data.student?.length!);
            } catch (error) {
                const axiosError = error as AxiosError<GetStudentResponse>;
                const message = axiosError.response?.data.message || "Cannot Load ALumnis";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAlumni();
    }, []);

    // const showDetails = (id: string) => {
    //     router.push(`/admin/dashboard/alumni/${year}/${id}`);
    // }

    return (
        <div className="p-4">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        { students?.length === 0 ? (
                            <div className="w-full h-screen flex items-center justify-center gap-2">
                                <p className="text-5xl font-bold">No Students Found</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <Card>
                                        <CardContent className="p-6">
                                        <div className="text-2xl font-bold text-foreground">{totalstudents}</div>
                                        <p className="text-muted-foreground">Total Student</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                {students?.map((request) => {

                                    return (
                                    <Card
                                        key={request.id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardHeader className="pb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div>
                                            <CardTitle className="text-xl font-semibold">
                                                {request.name}
                                            </CardTitle>
                                            </div>
                                        </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                            <h4 className="font-medium text-foreground">
                                                Contact Information
                                            </h4>
                                            <div className="text-sm space-y-1">
                                                <p>
                                                <span className="text-muted-foreground">Email:</span>{" "}
                                                {request.user.email}
                                                </p>
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Student ID:
                                                </span>{" "}
                                                {request.rollNo}
                                                </p>
                                            </div>
                                            </div>

                                            <div className="space-y-2">
                                            <h4 className="font-medium text-foreground">
                                                Current Status
                                            </h4>
                                            <div className="text-sm space-y-1">
                                                {/* <p><span className="text-muted-foreground">Position:</span> {request.currentPosition}</p> */}
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Course:
                                                </span>{" "}
                                                {request.course || "—"}
                                                </p>
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Branch:
                                                </span>{" "}
                                                {request.branch}
                                                </p>
                                            </div>
                                            </div>
                                        </div>

                                        {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                            <Button variant="outline" className="flex-1 sm:flex-none cursor-pointer" onClick={() => showDetails(request.id)}>
                                            <Eye size={16} className="mr-2" />
                                            View Details
                                            </Button>
                                        </div> */}
                                        </CardContent>
                                    </Card>
                                    );
                                })}
                                </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}