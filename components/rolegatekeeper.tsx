"use client";

import { useCurrentUserRole } from "@/hooks/currentuser-role";
import { UserRole } from "@prisma/client";
import { FormError } from "./formresult";

type RoleGateKeeperProps = {
  children: React.ReactNode;
  Allowedrole: UserRole;
};

const RoleGateKeeper = ({ children, Allowedrole }: RoleGateKeeperProps) => {
  const role = useCurrentUserRole();

  if (role !== Allowedrole) {
    return (
      <FormError errormessage="You are no previleges to access this page" />
    );
  }

  return <div>{children}</div>;
};

export default RoleGateKeeper;
