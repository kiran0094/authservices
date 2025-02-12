"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/currentuser";

const Settings = () => {
  const user = useCurrentUser(); //we use {data :session}=useSession();

  const onclick = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    // signOut(); if you want only logout client stuff
    logout();
  };

  return (
    <div className="pt-6">
      <form onSubmit={onclick}>
        <button
          type="submit"
          className="bg-white text-center p-2 rounded-lg px-4 "
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Settings;
