'use client';
import EventCard from "@/components/EventCard";
import { SelectSeparator } from "@/components/ui/select";
import { Event, UpcomingEventResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EventsPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<Event[]>();
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<UpcomingEventResponse>('/api/get-events');
                const message = response.data.message;
                toast.success(message);
                setEvents(response.data.events);
            } catch (error) {
                const axiosError = error as AxiosError<UpcomingEventResponse>;
                const message = axiosError.response?.data.message || "Some Error Occured";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEvents();
    }, [])

    const redirectToEventDetailsPage = (id: string) => {
        router.push(`/student/dashboard/events/${id}`);
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
                                <h2 className="text-3xl font-bold text-foreground">Events</h2>
                                <p className="text-muted-foreground">View all your college events</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold mb-8">Upcoming Events</p>
                            <SelectSeparator />
                            {
                                events?.length === 0 ? (
                                    <div>No Upcoming Events</div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            {
                                                events?.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        title={event.title}
                                                        place={event.place}
                                                        time={new Date(event.time).toLocaleDateString()}
                                                        mode={event.mode}
                                                        eventBannerUrl={event.eventBannerUrl}
                                                        onClick={() => redirectToEventDetailsPage(event.id)}
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