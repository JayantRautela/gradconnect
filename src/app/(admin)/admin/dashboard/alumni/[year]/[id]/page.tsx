'use client';
import { useParams } from "next/navigation";

export default function AlumniDetailsPage () {
    const { id } = useParams();

    return (
        <div>{id}</div>
    )
}