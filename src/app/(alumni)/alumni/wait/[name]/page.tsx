'use client';
import { useParams } from "next/navigation";

export default function AlumniWaitPage () {
    const params = useParams<{ name: string}>();
    const alumniName = params.name;

    const replaceWithSpace = (name: string): string => {
        return name.replace('%20', " ");
    }

    return (
        <div className="flex items-center justify-center text-5xl bg-gray-100 w-full h-screen flex-col">
            <h1 className="font-bold">Hello, {replaceWithSpace(alumniName)} </h1>
            <p className="text-center">Your Application has been submitted. <br /> Please wait till your College Admin approves it.</p>
        </div>
    )
}