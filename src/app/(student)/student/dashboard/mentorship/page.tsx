'use client';
import Loader from "@/components/Loader";
import SessionCard from "@/components/SessionCard";
import { GetSessionResponse, JoinSessionResponse, Session } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function MentorhsipPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [upcomingSession, setUpcomingSessions] = useState<Session[]>([]);
    const [joinedSessions, setJoinedSessions] = useState<string[]>([]);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<GetSessionResponse>('/api/student/get-all-mentorship-sessions');
                const message = response.data.message;
                toast.success(message);
                console.log("Response :- ", response.data);
                setUpcomingSessions(response.data.data!);
                console.log("upcoming sessions :- ",upcomingSession);
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

    useEffect(() => {
        const checkStatuses = async () => {
            try {
                for (const session of upcomingSession) {
                    const res = await axios.get<GetSessionResponse>(
                        `/api/student/check-join-status/${session.id}` // 👈 sessionId in params
                    );

                    if (res.data.success) {
                        setJoinedSessions((prev) => [...prev, session.id]);
                    }
                }
            } catch (error) {
                const axiosError = error as AxiosError<GetSessionResponse>;
                const message = axiosError.response?.data.message || "Failed to check join status";
                toast.error(message);
            }
        };

        if (upcomingSession.length > 0) {
            checkStatuses();
        }
    }, [upcomingSession]);


    const redirectEventDetails = async (id: string) => {
        try {
            setIsJoining(true);
            const response = await axios.post<JoinSessionResponse>(`/api/alumni/join-mentorship-session/${id}`);
            const message = response.data.message;
            alert(`Copy the link and join the meeting on time :- ${response.data.link}`);
            toast.success(message);
            setJoinedSessions((prev) => [...prev, id]);
        } catch (error) {
            const axiosError = error as AxiosError<JoinSessionResponse>;
            const message = axiosError.response?.data.message || "Some Error Occured";
            toast.error(message);
            if (message === "Session is full") setJoinedSessions((prev) => [...prev, id]);
        } finally {
            setIsJoining(false);
        }
    }

    return (
        <div className="space-y-6">
            {
                isLoading ? (
                    <Loader />
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
                                                        buttonDisabled={joinedSessions.includes(session.id)}
                                                        isJoining = {isJoining}
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
