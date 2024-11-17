import Logo from "@/components/logo";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-end my-5 mr-5">
        <Logo />
        <ModeToggle />
      </div>
      <div className="h-[calc(100vh-200px)] flex flex-col justify-center">
        <h1 className="text-2xl font-medium text-center mb-5">Welcome to the best expense tracker for your life</h1>
        <div className="flex justify-center items-center gap-5">
          <Button>Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
