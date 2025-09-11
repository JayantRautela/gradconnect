'use client';
import { Button } from "@/components/ui/button";
import { Session, SessionResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function MentorhsipPage () {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [upcomingSession, setUpcomingSession] = useState<Session[]>();
    const [pastSession, setPastSession] = useState<Session[]>();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<SessionResponse>('/api/alumni/get-mentorship-session');
                const message = response.data.message;
                toast.success(message);
                setUpcomingSession(response.data.upcoming);
                setPastSession(response.data.past);
            } catch (error) {
                const axiosError = error as AxiosError<SessionResponse>;
                const message = axiosError.response?.data.message || "Some Error Occured";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSessions();
    }, [])

    const addEvent = () => {
        router.push('/alumni/dashboard/mentorship/add');
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
                            <Button className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground" onClick={addEvent}>
                                <Plus size={16} className="mr-2" />
                                Add Session
                            </Button>
                        </div>
                        <div>
                            <p className="text-3xl font-semibold">Upcoming Sessions</p>
                            <div className="mt-8">
                                {
                                    upcomingSession?.length === 0 ? (
                                        <div>No Upcoming Session</div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-2">
                                            {
                                                upcomingSession?.map((session) => (
                                                    <Card key={session.id}>
                                                        <CardHeader>
                                                            <CardTitle>{session.title}</CardTitle>
                                                            <CardDescription>Session Date - {new Date(session.time).toLocaleDateString()}</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>Created At : {new Date(session.createdAt).toLocaleDateString()}</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <p>Meeting Url - <Link href={session.meetingUrl} className="text-blue-400">{session.meetingUrl}</Link></p>
                                                        </CardFooter>
                                                    </Card>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}