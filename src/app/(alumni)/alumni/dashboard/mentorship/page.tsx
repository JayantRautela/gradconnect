'use client';
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function MentorhsipPage () {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                    </>
                )
            }
        </div>
    )
}