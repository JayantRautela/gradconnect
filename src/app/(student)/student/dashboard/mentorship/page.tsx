'use client';
import SessionCard from "@/components/SessionCard";
import { Button } from "@/components/ui/button";
import { GetSessionResponse, Session } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function MentorhsipPage () {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [upcomingSession, setUpcomingSessions] = useState<Session[]>();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<GetSessionResponse>('/api/student/get-all-mentorship-sessions');
                const message = response.data.message;
                toast.success(message);
                setUpcomingSessions(response.data.session);
            } catch (error) {
                const axiosError = error as AxiosError<GetSessionResponse>;
                const message = axiosError.response?.data.message || "Some Error Occured";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSession();
    }, [])

    const redirectEventDetails = (id: string) => {
        router.push(`/student/dashboard/mentorship/${id}`);
    }

    return (
        <div className="space-y-6">
            {
                isLoading ? (
                    <div className="w-full h-screen flex items-center justify-center gap-2">
                        <p className="text-5xl font-bold">Loading...</p>
                        <Loader2 className="w-12 h-12 animate-spin"/>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Mentorship Sessions</h2>
                                <p className="text-muted-foreground">Manage and view all your mentorship sessions</p>
                            </div>
                        </div>
                        <div>
                            {
                                upcomingSession?.length === 0 ? (
                                    <span>No Sessions Available</span>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            {
                                                upcomingSession?.map((session) => (
                                                    <SessionCard
                                                        key={session.id}
                                                        time = {session.time} 
                                                        title = {session.title}
                                                        currentCompany  = {session.createdBy.currentCompany}
                                                        onClick = {() => redirectEventDetails(session.id)}
                                                        name = {session.createdBy.name}
                                                        maxParticipant = {session.maxParticipant}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}
