import { ExtendedUser } from "@/auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type UserinfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const Userinfo = ({ user, label }: UserinfoProps) => {
  return (
    <Card className="w-[500px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center rounded-lg border shadow-sm p-3">
          <p className="font-medium text-sm">ID</p>
          <p className="truncate font-semibold text-xs max-w-[300px] bg-slate-100 rounded-md p-1">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border shadow-sm p-3">
          <p className="font-medium text-sm">name</p>
          <p className="truncate font-semibold text-xs max-w-[300px] bg-slate-100 rounded-md p-1">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border shadow-sm p-3">
          <p className="font-medium text-sm">Email</p>
          <p className="truncate font-semibold text-xs max-w-[300px] bg-slate-100 rounded-md p-1">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border shadow-sm p-3">
          <p className="font-medium text-sm">Role</p>
          <p className="truncate font-semibold text-xs max-w-[300px] bg-slate-100 rounded-md p-1">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border shadow-sm p-3">
          <p className="font-medium text-sm">TwoFactorEnabled</p>
          <Badge variant={user?.isTwoFactorEnable ? "success" : "destructive"}>
            {user?.isTwoFactorEnable ? "On" : "off"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
