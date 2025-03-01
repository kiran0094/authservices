"use client";
import { useCurrentUser } from "@/hooks/currentuser";
import { Userinfo } from "@/components/userinfo";
const client = () => {
  const user = useCurrentUser();
  return (
    <div className="pt-5">
      <Userinfo user={user} label="💻server" />
    </div>
  );
};

export default client;
