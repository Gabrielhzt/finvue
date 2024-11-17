import Logo from "@/components/logo";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "../../auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const session = await auth()

  const handleSignIn = async () => {
    "use server"
    const result = await signIn("google", { redirectTo: "/dashboard" })
    console.log(result)
  }

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div>
      <div className="flex justify-between items-end my-5 mr-5">
        <Logo />
        <ModeToggle />
      </div>
      <div className="h-[calc(100vh-100px)] flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to FinVue</h1>
        <p className="text-muted-foreground text-center mb-8">Your personal finance tracker</p>
        <div className="flex flex-col justify-center items-center gap-5 w-full max-w-sm mx-auto">
          <form
            action={async (formData) => {
              "use server"
              await signIn("resend", formData)
            }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Button type="submit" className="w-full">Continue with Email</Button>
          </form>
          <div className="flex items-center w-full gap-2 my-2">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <form
            action={handleSignIn}
            className="w-full"
          >
            <Button type="submit" variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
