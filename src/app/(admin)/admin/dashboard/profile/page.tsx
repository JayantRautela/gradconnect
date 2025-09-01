'use client'
import { AdminProfileResponse } from "@/types/ApiResponse"
import axios, { AxiosError } from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Profile () {
    const [CollegeName, setCollegeName] = useState("");
    const [acceptedDomain, setAcceptedDomain] = useState("")
    const [id, setId] = useState("");
    const [imageSrc, setImageSrc] = useState<string | null>("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<AdminProfileResponse>('/api/admin/me');
                const message = response.data.message;
                toast.success(message);
                setCollegeName(response.data.admin.CollegeName);
                setAcceptedDomain(response.data.admin.acceptedDomain);
                setId(response.data.admin.id);
                setImageSrc(response.data.admin.collegeLogo);
                setEmail(response.data.admin.user.email);
            } catch (error) {
                const axiosError = error as AxiosError<AdminProfileResponse>
                const message = axiosError.response?.data.message || "Some Error Occured";
                toast.error(message);
            }
        }

        fetchProfile();
    }, [])
    return (
        <div className="flex flex-col gap-5">
            <h1>Profile page</h1>
            <p>{CollegeName}</p>
            <p>{id}</p>
            <p>{acceptedDomain}</p>
            <p>
                {imageSrc && 
                    <Image
                        src={imageSrc}
                        alt="college logo"
                        width={100}
                        height={100}
                    />
                    
                }
            </p>
            <p>{email}</p>
        </div>
    )
}