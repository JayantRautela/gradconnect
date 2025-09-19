import { Loader2 } from "lucide-react";

export default function Loader () {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-2">
            <p className="text-5xl font-bold">Loading...</p>
            <Loader2 className="w-12 h-12 animate-spin"/>
        </div>
    )
}