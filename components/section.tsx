"use client"
import { useSession } from "next-auth/react";

export default function Section() {
    const { data: session, status } = useSession()

    console.log(session);

    return (
        <div>
            {session ? (<div>connected</div>) : (<div>not connected</div>)}
        </div>
    )
}
