'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event, EventDetailsResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EventDetailsPage () {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [event, setEvent] = useState<Event>();
    const [imageSrc,  setImageSrc] = useState("");

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<EventDetailsResponse>(`/api/get-event-details/${id}`);
                const message = response.data.message;
                toast.success(message);
                setEvent(response.data.event);
                if (response.data.event?.eventBannerUrl) {
                  setImageSrc(response.data.event?.eventBannerUrl);
                }
            } catch (error) {
                const axiosError = error as AxiosError<EventDetailsResponse>;
                const message = axiosError.response?.data.message || "Some Error Occured";
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEventDetails();
    }, [])

    return (
        <div className="p-4">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center gap-2">
          <p className="text-5xl font-bold">Loading...</p>
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Events Details</h1>
          <Card key={event?.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4 flex justify-between">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {event?.title}
                  </CardTitle>
                </div>
              </div>
              <div className="mr-16">
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    width={125}
                    height={125}
                    alt={"Event Banner"}
                    className="rounded"
                  />
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    Event Details
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">Place:</span>{" "}
                      {event?.place}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Mode:</span>{" "}
                      {event?.mode}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      {/* {new Date(event?.time).toLocaleDateString()} */}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    Description :- 
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>{event?.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    )
}