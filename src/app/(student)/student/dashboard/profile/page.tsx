"use client";
import { Admin, AdminProfileResponse, Student, StudentDetailsResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {  Mail, Loader2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader";


export default function Profile() {
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [student, setStudent] = useState<Student>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<StudentDetailsResponse>("/api/student/me");
        const message = response.data.message;
        toast.success(message);
        setImageSrc(response.data.student?.ProfilePictureUrl!);
        setStudent(response.data.student);
      } catch (error) {
        const axiosError = error as AxiosError<AdminProfileResponse>;
        const message =
          axiosError.response?.data.message || "Some Error Occured";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="space-y-4">
      { isLoading ? (
        <Loader />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Profile</h2>
                <p className="text-muted-foreground">
                  Manage your profile 
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      { imageSrc && (
                        <Image src={imageSrc} alt="college logo" width={48} height={48}/>
                      )}
                    </div>
                    <CardTitle className="text-xl">{student?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{student?.user.email}</span>
                      
                    </div>
                    <div>
                      <span>Course : {student?.course}</span>
                    </div>
                    <div>
                      <span>Branch : {student?.branch}</span>
                    </div>
                    <div>
                      <span>Current Year : {student?.currentYear}</span>
                    </div>
                    {/* <div className="flex items-center gap-3 text-sm">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{phoneNumber}</span>
                    </div> */}
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Joined {new Date(student?.createdAt!).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) 
      }
    </div>
  );
}
