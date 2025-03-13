import React from "react";
import { Button } from "../ui/button";
import { Google, Github } from "@/lib/icons";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
const Socail = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onclick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onclick("google")}
      >
        <Google />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onclick("github")}
      >
        <Github />
      </Button>
    </div>
  );
};

export default Socail;
