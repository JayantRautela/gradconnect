'use client';

import { useParams } from "next/navigation";

export default function EventDetailsPage () {
    const params = useParams<{ id: string }>();
    const eventId = params.id;
}