import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UseAppContext } from "@/context/UseAppContext";
import {
  type ChangePasswordFormValues,
  ChangePasswordSchema,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, changePassword } = UseAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });

  async function onChangePassword(values: ChangePasswordFormValues) {
    setIsLoading(true);
    try {
      const res = await changePassword(values);
      if (res.responseCode === "20000") {
        form.reset();
        toast.success("Update password berhasil", {
          richColors: true,
          position: "top-right",
        });
      }
    } catch {
      toast.error("Update password gagal", {
        richColors: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [user]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <p className="text-muted-foreground">
        Overview of daily, monthly, and yearly transactions to help you track
        performance at a glance.
      </p>

      <div className="px-4 lg:px-6">
        <Card>
          <CardContent>
            {isLoadingPage ? (
              <div className="flex items-center justify-center h-[60vh] gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-xl text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Upload Foto */}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <h1 className="text-xl font-bold">Edit Profile Picture</h1>
                    <p className="text-muted-foreground text-sm pr-10">
                      Upload a profile picture of yourself, or the character,
                      you always wanted to be.
                    </p>
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-center gap-4 pb-6">
                      <div className="flex gap-3 items-center">
                        <Avatar className="h-18 w-18 rounded-full">
                          <AvatarImage
                            src={user?.profileImage}
                            alt={user?.name}
                          />
                          <AvatarFallback className="rounded-full">
                            CN
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-2 justify-center">
                          <p className="text-sm font-bold">Upload new Image</p>
                          <span className="text-muted-foreground text-xs">
                            Max file size - 10mb
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-2 ml-auto">
                        <Button variant="outline">Upload</Button>
                        <Button variant="destructive">Remove Image</Button>
                      </div>
                    </div>

                    <Separator />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <h1 className="text-xl font-bold">
                      Edit Personal Infoormation
                    </h1>
                    <p className="text-muted-foreground text-sm pr-10">
                      Tell the world about yourself, will be visible only in
                      your profile
                    </p>
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex flex-col gap-4 pb-6">
                      <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input readOnly id="email" value={user?.email} />
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input readOnly id="name" value={user?.name} />
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input readOnly id="phone" value={user?.phone} />
                      </div>
                    </div>

                    <Separator />
                  </div>
                </div>

                {/* Change password */}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <h1 className="text-xl font-bold">Change Password</h1>
                    <p className="text-muted-foreground text-sm pr-10">
                      Update your password regularly to keep your account
                      secure.
                    </p>
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex flex-col gap-4 pb-6">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onChangePassword)}
                          className="space-y-6"
                        >
                          {/* Current Passowrd */}
                          <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Current Password{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* New Passowrd */}
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  New Password{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Confirmation Passowrd */}
                          <FormField
                            control={form.control}
                            name="newPasswordConfirmation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Confirmation Password{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="text-right">
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Loader2 className="size-4 animate-spin" />
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                <p>Change Password</p>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                    <Separator />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
