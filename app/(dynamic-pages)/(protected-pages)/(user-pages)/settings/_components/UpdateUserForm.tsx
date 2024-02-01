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

type UpdateUserFormProps = {
  userPrivateInfo: Table<"user_private_info">;
  userProfile: Table<"user_profiles">;
  onUserNameUpload: (userName: string) => void;
  onSubmit: (
    firstName: string | undefined,
    lastName: string | undefined
  ) => void;
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
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [userName, setUserName] = useState(userUserName);

  // const handleImage = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   fieldChange: (value: string) => void
  // ) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();

  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setFiles(Array.from(e.target.files));

  //     if (!file.type.includes("image")) return;

  //     fileReader.onload = async (event) => {
  //       const imageDataUrl = event.target?.result?.toString() || "";
  //       fieldChange(imageDataUrl);
  //     };

  //     fileReader.readAsDataURL(file);
  //   }
  // };

  // const form = useForm<z.infer<typeof updateUserFormSchema>>({
  //   resolver: zodResolver(updateUserFormSchema),
  //   defaultValues: {
  //     firstName: firstName,
  //     email: userEmail,
  //     lastName: lastName,
  //     userName: userName,
  //   },
  // });

  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values.firstName, values.lastName);
          onUserNameUpload(values.userName);
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
                      console.log("in input", file);
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
              <div className="grid gap-6 lg:grid-cols-1 lg:max-w-xs">
                <div className="">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1 col-span-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <FormControl className="">
                          <Input
                            type="text"
                            className=""
                            disabled={isLoading}
                            placeholder={firstName ?? "First Name"}
                            id="firstName"
                            {...field}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </FormControl>
                        {/* {form.formState.errors.firstName && (
                          <p className="text-destructive text-sm">
                            {form.formState.errors.firstName.message}
                          </p>
                        )} */}
                        {/* <FormMessage className="text-destructive" /> */}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1 col-span-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <FormControl className="">
                          <Input
                            type="text"
                            className=""
                            disabled={isLoading}
                            placeholder={lastName ?? "Last Name"}
                            id="lastName"
                            {...field}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </FormControl>
                        {/* {form.formState.errors.lastName && (
                          <p className="text-destructive text-sm">
                            {form.formState.errors.lastName.message}
                          </p>
                        )} */}
                        {/* <FormMessage className="text-destructive" /> */}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="flex-1 col-span-2">
                        <Label htmlFor="userName">User Name</Label>
                        <FormControl className="">
                          <Input
                            type="text"
                            className=""
                            disabled={isLoading}
                            placeholder={userName ?? "User Name"}
                            {...field}
                            id="userName"
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          />
                        </FormControl>
                        {/* {form.formState.errors.userName && (
                          <p className="text-destructive text-sm">
                            {form.formState.errors.userName.message}
                          </p>
                        )} */}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    name="state"
                    disabled
                    render={({ field }) => (
                      <FormItem className="flex-1 col-span-2">
                        <Label htmlFor="Email">Email</Label>

                        <FormControl className="">
                          <Input
                            type="text"
                            className=""
                            disabled={isLoading}
                            placeholder={userEmail}
                            {...field}
                            id="email"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </form>
    </Form>
  );
}

export default UpdateUserForm;
