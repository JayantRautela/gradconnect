import { EventResponse, Event } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function EventsPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>();
    const [pastEvents, setPastEvents] = useState<Event[]>();

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
}