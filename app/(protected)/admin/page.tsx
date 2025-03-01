"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUserRole } from "@/hooks/currentuser-role";
import RoleGateKeeper from "@/components/rolegatekeeper";
import { UserRole } from "@prisma/client";
import { Formsuccess } from "@/components/formresult";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { isAdmin } from "@/actions/admin";

const Admin = () => {
  const role = useCurrentUserRole();
  const onlyAdminserveraction = () => {
    isAdmin().then((res) => {
      if (res.error) {
        toast.error(res.error);
      }
      if (res.success) {
        toast.success(res.success);
      }
    });
  };
  const onlyAdminApi = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("You are allowed to access this page");
      } else {
        toast.error("You are not allowed to access this page");
      }
    });
  };
  return (
    <Card className="w-[600px] mt-4">
      <CardHeader className="text-center text-2xl font-bold">Admin</CardHeader>
      <CardContent>
        <RoleGateKeeper Allowedrole={UserRole.ADMIN}>
          <Formsuccess successmessage="You are allowed to access this page" />
        </RoleGateKeeper>
        <div className="flex flex-row justify-between items-center p-3 mt-3 shadow-md rounded-lg border">
          <h1 className="text-sm font-medium">Admin only API route</h1>
          <Button className="px-2" onClick={onlyAdminApi}>
            click to test
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center p-3 mt-3 shadow-md rounded-lg border">
          <h1 className="text-sm font-medium">Admin only server action</h1>
          <Button className="px-2" onClick={onlyAdminserveraction}>
            click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
