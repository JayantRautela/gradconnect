'use client'
import { useParams } from "next/navigation";


export default function AllAlumniPage () {
    const { year } = useParams();

    return (
        <div>{year}</div>
    )
}