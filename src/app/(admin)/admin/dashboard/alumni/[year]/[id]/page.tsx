"use client";
import { Alumni, AlumniDetailsResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isCuid } from "cuid";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AlumniDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [alumni, setAlumni] = useState<Alumni>();
  const { id } = useParams();
  const [imageSrc, setImageSrc] = useState("");

  if (!isCuid(id as string)) {
    return (
      <div className="w-full h-screen flex items-center justify-center gap-2">
        <p className="text-5xl font-bold">Invalid Alumni ID</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<AlumniDetailsResponse>(
          `/api/admin/alumni/${id}`
        );
        const message = response.data.message;
        toast.success(message);
        setImageSrc(
          response.data.alumni?.ProfilePictureUrl as unknown as string
        );
        setAlumni(response.data.alumni);
      } catch (error) {
        const axiosError = error as AxiosError<AlumniDetailsResponse>;
        const message =
          axiosError.response?.data.message || "Some Error Occured";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumni();
  }, []);
  return (
    <div className="p-4">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center gap-2">
          <p className="text-5xl font-bold">Loading...</p>
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <Card key={alumni?.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4 flex justify-between">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {alumni?.name}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {alumni?.branch} • Class of {alumni?.passoutYear}
                  </p>
                </div>
              </div>
              <div className="mr-16">
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    width={125}
                    height={125}
                    alt={alumni?.name!}
                    className="rounded"
                  />
                )}
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
                      {alumni?.user.email}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {alumni?.phoneNumber}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Student ID:</span>{" "}
                      {alumni?.rollNo}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    Current Status
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Position:</span> {alumni?.currentPosition}</p>
                    <p>
                      <span className="text-muted-foreground">Company:</span>{" "}
                      {alumni?.currentCompany || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Year Of Experience:
                      </span>{" "}
                      {alumni?.yearOfExperience || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Submitted:</span>{" "}
                      {new Date(
                        alumni?.createdAt as unknown as string
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">
                    Academic Qualifications
                  </h4>
                  <div className="text-sm space-y-1">
                    {/* <p><span className="text-muted-foreground">Position:</span> {alumni?.currentPosition}</p> */}
                    <p>
                      <span className="text-muted-foreground">Course:</span>{" "}
                      {alumni?.course || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Branch:</span>{" "}
                      {alumni?.branch}
                    </p>
                    <p>
                      <span className="text-muted-foreground">CGPA:</span>{" "}
                      {alumni?.cgpa}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Links</h4>
                  <div className="text-sm space-y-1">
                    {/* <p><span className="text-muted-foreground">Position:</span> {alumni?.currentPosition}</p> */}
                    <p>
                      <a
                        className="hover:underline text-blue-500"
                        href={alumni?.linkedinProfileUrl}
                        target="_blank"
                      >
                        LinkedIn Link
                      </a>
                    </p>
                    <p>
                      {alumni?.portfolioLink && (
                        <a
                          className="hover:underline text-blue-500"
                          href={alumni?.portfolioLink}
                          target="_blank"
                        >
                          Portfolio Link
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
