"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Userbutton } from "@/components/auth/userButton";

const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="flex h-16 w-[80%] items-center justify-between px-4 bg-primary-foreground rounded-xl shadow-sm">
      <div className="flex gap-4">
        <Button
          asChild
          variant={path === "/client" ? "default" : "link"}
          size="sm"
          className="text-lg font-bold"
        >
          <Link href="/client">client</Link>
        </Button>
        <Button
          asChild
          variant={path === "/server" ? "default" : "link"}
          size="sm"
          className="text-lg font-bold"
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={path === "/adimin" ? "default" : "link"}
          size="sm"
          className="text-lg font-bold"
        >
          <Link href="/admin">admin</Link>
        </Button>
        <Button
          asChild
          variant={path === "/settings" ? "default" : "link"}
          size="sm"
          className="text-lg font-bold"
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <Userbutton />
    </nav>
  );
};

export default Navbar;
