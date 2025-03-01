"use client";
import * as Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/setting";
import { useTransition, useState } from "react";
import { SettingsSchema } from "@/schema";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/currentuser";
import { Formsuccess, FormError } from "@/components/formresult";
import { UserRole } from "@prisma/client";

const Settings = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const from = useForm<Zod.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });
  const onSubmit = (value: Zod.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(value)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch((error) => setError("something went wrong"));
    });
  };
  return (
    <Card className="w-[600px] mt-4">
      <CardHeader>
        <p className="text-center text-2xl font-bold">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...from}>
          <form className="space-y-6" onSubmit={from.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={from.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={from.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Test@gmail.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={from.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={from.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={from.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={from.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg shadow-md border p-3">
                    <div>
                      <FormLabel>TwoFactor authcation</FormLabel>
                      <FormDescription>
                        Enable Two Factor authcation for your account
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Formsuccess successmessage={success} />
            <FormError errormessage={error} />
            <Button type="submit">save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Settings;
