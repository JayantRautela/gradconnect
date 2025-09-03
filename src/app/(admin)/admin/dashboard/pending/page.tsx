"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AcceptingAlumniRequestResponse, Alumni, AlumniPendingRequestResponse, RejectingAlumniRequestResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge, Check, Eye, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pending() {
  const [isLoading, setIsLoading] = useState(false);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<AlumniPendingRequestResponse>(
          "/api/admin/get-alumni-requests"
        );
        toast.success(response.data.message);
        setAlumni(response.data.alumniRequest);
      } catch (error) {
        const axiosError = error as AxiosError<AlumniPendingRequestResponse>;
        const message =
          axiosError.response?.data.message || "Some Error Occurred";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [isAccepting, isRejecting]);

  const handleApprove = async (id: string) => {
    // api calls to be made
    console.log(id);
    try {
      setIsAccepting(true);
      const response = await axios.patch<AcceptingAlumniRequestResponse>(`/api/admin/approve-alumni-request/${id}`);
      const message = response.data.message;
      toast.success(message);
    } catch (error) {
        const axiosError = error as AxiosError<AcceptingAlumniRequestResponse>;
        const message = axiosError.response?.data.message || "Some Error Occured";
        toast.error(message);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = async (id: string) => {
    // api calls to be made
    console.log(id);
    try {
      setIsRejecting(true);
      const response = await axios.delete<RejectingAlumniRequestResponse>(`/api/admin/approve-alumni-request/${id}`);
      const message = response.data.message;
      toast.success(message);
    } catch (error) {
        const axiosError = error as AxiosError<RejectingAlumniRequestResponse>;
        const message = axiosError.response?.data.message || "Some Error Occured";
        toast.error(message);
    } finally {
      setIsRejecting(false);
    }
  };

  const showDetails = async (id: string) => {
    // api calls to be made
    console.log(id);
    router.push(`/admin/dashboard/pending/${id}`);
  }

  const getDaysPending = (createdAt: string | Date) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (days: number) => {
    if (days <= 2) return "bg-green-100 text-green-700";
    if (days <= 5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center gap-2">
          <p className="text-5xl font-bold">Loading...</p>
          <Loader2 className="w-12 h-12 animate-spin"/>
        </div>
      ) : alumni.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="space-y-4">
          {alumni.map((request) => {
            const daysPending = getDaysPending(request.createdAt);

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

                    <Badge className={getStatusColor(daysPending)}>
                      {daysPending} {daysPending === 1 ? "day" : "days"} pending
                    </Badge>
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

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none cursor-pointer"
                      disabled={isAccepting || isRejecting}
                    >
                      <Check size={16} className="mr-2" />
                      Approve Request
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                      className="flex-1 sm:flex-none cursor-pointer"
                      disabled={isAccepting || isRejecting}
                    >
                      <X size={16} className="mr-2" />
                      Reject Request
                    </Button>

                    <Button variant="outline" className="flex-1 sm:flex-none cursor-pointer" onClick={() => showDetails(request.id)} disabled={isAccepting || isRejecting}>
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
