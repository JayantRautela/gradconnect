'use client';
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { EventResponse, Event } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function EventsPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>();
    const [pastEvents, setPastEvents] = useState<Event[]>();
    const router = useRouter();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<EventResponse>('/api/admin/get-events');
                const message = response.data.message;
                toast.success(message);
                setUpcomingEvents(response.data.upcomingEvents);
                setPastEvents(response.data.pastEvents);
            } catch (error) {
                const axiosError = error as AxiosError<EventResponse>;
                const message = axiosError.response?.data.message || "Some error occured";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvent();
    }, [])

    const redirectToEventDetailsPage = (id: string) => {
        router.push(`/admin/dashboard/events/${id}`);
    };

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
                                <p className="text-muted-foreground">Manage and view all your events</p>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground">
                                <Plus size={16} className="mr-2" />
                                Add Event
                            </Button>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold">Upcoming Events</p>
                            {
                                upcomingEvents?.length === 0 ? (
                                    <div>No Upcoming Events</div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            {
                                                upcomingEvents?.map((event) => (
                                                    <EventCard
                                                        title={event.title}
                                                        place={event.place}
                                                        time={event.time.toLocaleDateString()}
                                                        mode={event.mode}
                                                        onClick={() => redirectToEventDetailsPage(event.id)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            <p className="text-2xl font-semibold">Past Events</p>
                            {
                                upcomingEvents?.length === 0 ? (
                                    <div>No Past Events</div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            {
                                                pastEvents?.map((event) => (
                                                    <EventCard
                                                        title={event.title}
                                                        place={event.place}
                                                        time={event.time.toLocaleDateString()}
                                                        mode={event.mode}
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