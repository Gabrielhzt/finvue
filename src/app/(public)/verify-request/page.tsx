import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function VerifyRequest() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl text-center">Check your email</CardTitle>
                <CardDescription className="text-center">
                    A sign in link has been sent to your email address.
                </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                <p>
                    Click the link in the email to sign in to your account.
                    If you don&apos;t see the email, check your spam folder.
                </p>
                </CardContent>
            </Card>
        </div>
    )
}