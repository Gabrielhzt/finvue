import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Dashboard() {
    const session = await auth()
    
    const handleSignOut = async () => {
        "use server"
        await signOut()
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Welcome {session?.user?.name || "Guest"}</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <Link href="/">Home</Link>
        </div>
    )
}