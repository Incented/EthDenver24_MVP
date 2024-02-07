"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideCamera } from "lucide-react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { updateUserFormSchema } from "./updateUserFormData";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoggedInUserEmail } from "@/hooks/useLoggedInUserEmail";
import { Table } from "@/types";
import { getUserAvatarUrl } from "@/utils/helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  PrimaryUserDetailsSchema,
  primaryUserDetailsSchema,
} from "./userDetailsSchema";

type UpdateUserFormProps = {
  userPrivateInfo: Table<"user_private_info">;
  userProfile: Table<"user_profiles">;
  onUserNameUpload: (userName: string) => void;
  onSubmit: (firstName: string, lastName: string) => void;
  isLoading: boolean;
  profileAvatarUrl?: string;
  isUploading: boolean;
  onFileUpload?: (file: File) => void;
  isNewAvatarImageLoading: boolean;
  setIsNewAvatarImageLoading: (value: boolean) => void;
};

const MotionImage = motion(Image);

function UpdateUserForm({
  userPrivateInfo,
  userProfile,
  onUserNameUpload,
  onSubmit,
  isLoading,
  profileAvatarUrl,
  onFileUpload,
  isUploading,
  isNewAvatarImageLoading,
  setIsNewAvatarImageLoading,
}: UpdateUserFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userEmail = useLoggedInUserEmail();
  const avatarURL = getUserAvatarUrl({
    profileAvatarUrl,
    email: userEmail,
  });
  const userFirstName = userProfile.first_name;
  const userLastName = userProfile.last_name;
  const userUserName = userPrivateInfo.user_name;

  const { register, handleSubmit } = useForm<PrimaryUserDetailsSchema>({
    resolver: zodResolver(primaryUserDetailsSchema),
    defaultValues: {
      firstName: userFirstName ?? "",
      lastName: userLastName ?? "",
      avatarUrl: avatarURL,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit(values.firstName, values.lastName);
        onUserNameUpload(values.username ?? userUserName ?? "");
      })}
      className="w-full md:h-full h-full overflow-auto md:overflow-hidden"
    >
      <Card className="p-6 w-full h-full overflow-auto md:overflow-hidden">
        <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4 ">
          <div className="w-full">
            <h1 className="text-base leading-9 font-semibold">
              General Settings
            </h1>
            <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
              Update your photo profile and personal details here
            </p>
          </div>
          <CardFooter className="w-full justify-end gap-2 md:mt-3 px-0 py-0">
            <Button
              variant="outline"
              type="submit"
              className="w-full md:w-fit bg-secondary hover:bg-muted border-none"
            >
              Cancel{" "}
            </Button>
            <Button type="submit" className="w-full md:w-fit">
              Save
            </Button>
          </CardFooter>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col md:flex md:flex-row items-center md:items-start gap-6 w-full h-full overflow-auto">
          <Card className="shadow-none w-[228px] md:w-4/12 border-none bg-secondary py-6 lg:col-span-1  h-fit">
            <Label
              className="inline p-0 m-0 cursor-pointer text-muted-foreground"
              htmlFor="file-input"
            >
              <div className="rounded-full w-[96px] h-[96px] lg:w-[150px] lg:h-[150px] mx-auto border flex justify-center items-center">
                <MotionImage
                  animate={{
                    opacity: isNewAvatarImageLoading ? [0.5, 1, 0.5] : 1,
                  }}
                  transition={
                    /* eslint-disable */
                    isNewAvatarImageLoading
                      ? {
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }
                      : undefined
                    /* eslint-enable */
                  }
                  onLoad={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  onError={() => {
                    setIsNewAvatarImageLoading(false);
                  }}
                  loading="eager"
                  width={64}
                  height={64}
                  className="h-16 object-center object-cover w-16 border-2 border-gray-200 rounded-full"
                  src={avatarURL}
                  alt="avatarUrl"
                />
                <input
                  disabled={isUploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onFileUpload?.(file);
                    }
                  }}
                  ref={fileInputRef}
                  type="file"
                  name="file-input"
                  id="file-input"
                  hidden
                  accept="image/*"
                />
              </div>
            </Label>
            <div className="mt-1 text-xs text-center text-default-500">
              <p>Allowed *.jpeg, *.jpg, *.png, *.gif</p>
              <p>max size of 3.1 MB</p>
            </div>
            <CardFooter className="flex justify-center gap-4 mt-6 p-0 px-6">
              <Button className="w-full">Update</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-none border-none w-full md:w-8/12 lg:col-span-3 h-fit">
            <div className="mt-1 grid gap-7 lg:grid-cols-1 lg:max-w-xs">
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="firstName" className="text-sm">
                  First name
                </Label>
                <Input
                  {...register("firstName")}
                  type="text"
                  disabled={isLoading}
                  placeholder={userFirstName ?? "First Name"}
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="lastName" className="text-sm">
                  Last name
                </Label>
                <Input
                  {...register("lastName")}
                  type="text"
                  className=""
                  disabled={isLoading}
                  placeholder={userLastName ?? "Last Name"}
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="username" className="text-sm">
                  User name
                </Label>
                <Input
                  {...register("username")}
                  type="text"
                  className=""
                  disabled={isLoading}
                  placeholder={userUserName ?? "User Name"}
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  type="text"
                  className=""
                  disabled
                  placeholder={userEmail ?? "Enter your email"}
                  id="email"
                />
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </form>
  );
}

export default UpdateUserForm;
