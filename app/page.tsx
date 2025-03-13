import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-[#2c67f2] via-[#62cff4] to-indigo-500">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-8xl font-bold text-white drop-shadow-md",
            poppins.className,
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white ">simple authcation service</p>
        <LoginButton mode="model" asChild>
          <Button size="lg" variant="secondary">
            sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
