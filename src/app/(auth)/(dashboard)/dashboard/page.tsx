import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Dashboard() {
    const session = await auth()

    return (
        <div >
            <h1>Welcome {session?.user?.name || "Guest"}</h1>
            <Button>
                <Link href="/">Home</Link>
            </Button>
        </div>
    )
}