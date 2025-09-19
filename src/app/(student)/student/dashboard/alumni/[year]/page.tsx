'use client'
import { Alumni, GetAlumniResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Eye, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

export default function AllAlumniPage () {
    const { year } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [alumnis, setAlumnis] = useState<Alumni[]>();
    const [totalAlumni, setTotalAlumni] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<GetAlumniResponse>(`/api/student/get-all-alumni?passoutYear=${year}`);
                const message = response.data.message;
                toast.success(message);
                setAlumnis(response.data.alumni);
                setTotalAlumni(response.data.alumni?.length!);
            } catch (error) {
                const axiosError = error as AxiosError<GetAlumniResponse>;
                const message = axiosError.response?.data.message || "Cannot Load ALumnis";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAlumni();
    }, []);

    return (
        <div className="p-4">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        { alumnis?.length === 0 ? (
                            <div className="w-full h-screen flex items-center justify-center gap-2">
                                <p className="text-5xl font-bold">No Alumni Found</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <Card>
                                        <CardContent className="p-6">
                                        <div className="text-2xl font-bold text-foreground">{totalAlumni}</div>
                                        <p className="text-muted-foreground">Total Alumni</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                {alumnis?.map((request) => {

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
                                            <p className="text-muted-foreground">
                                                {request.branch} • Class of {request.passoutYear}
                                            </p>
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
                                                <span className="text-muted-foreground">Phone:</span>{" "}
                                                {request.phoneNumber}
                                                </p>
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Student ID:
                                                </span>{" "}
                                                {request.id}
                                                </p>
                                            </div>
                                            </div>

                                            <div className="space-y-2">
                                            <h4 className="font-medium text-foreground">
                                                Current Status
                                            </h4>
                                            <div className="text-sm space-y-1">
                                                <p><span className="text-muted-foreground">Position:</span> {request.currentPosition}</p>
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Company:
                                                </span>{" "}
                                                {request.currentCompany || "—"}
                                                </p>
                                                <p>
                                                <span className="text-muted-foreground">
                                                    Submitted:
                                                </span>{" "}
                                                {new Date(request.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            </div>
                                        </div>
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