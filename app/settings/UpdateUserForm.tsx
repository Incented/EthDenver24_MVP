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
import { LucideCamera, SwitchCamera } from "lucide-react";
import { ChangeEvent, FC, useState } from "react";
import { updateUserFormSchema } from "./updateUserFormData";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";

interface UpdateUserFormProps {}

const UpdateUserForm: FC<UpdateUserFormProps> = ({}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const form = useForm<z.infer<typeof updateUserFormSchema>>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      lastName: "",
      userName: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserFormSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-3"
      >
        <Card className="py-10 lg:col-span-1 h-fit">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl className="">
                  <>
                    <div className="rounded-full w-[150px] h-[150px] mx-auto outline flex justify-center items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder=""
                        className="z-40 w-full h-full p-4 rounded-full opacity-0 cursor-pointer "
                        onChange={(e) => handleImage(e, field.onChange)}
                      />
                      <div
                        className={cn(
                          "h-[130px] w-[130px]  rounded-full absolute flex justify-center items-center bg-cover bg-center group",
                          field.value
                            ? "bg-[rgba(22, 28, 36, 0.64)]"
                            : "bg-default-100"
                        )}
                        style={{ backgroundImage: `url(${field.value})` }}
                      >
                        <div
                          className={cn(
                            "flex  justify-center items-center flex-col gap-1 text-default-400",
                            field.value ? "opacity-0" : "opacity-1"
                          )}
                        >
                          <LucideCamera />
                          <p className="text-tiny">
                            {field.value ? "Update Photo" : "Upload photo"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-center text-default-500">
                      <p>Allowed *.jpeg, *.jpg, *.png, *.gif</p>
                      <p>max size of 3.1 MB</p>
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardFooter className="flex justify-center gap-4 p-0 mt-6">
            <Button className="w-fit">Update</Button>
          </CardFooter>
        </Card>

        <Card className="p-4 lg:col-span-2 h-fit">
          <div className="grid gap-6 lg:grid-cols-2">
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
                        placeholder="Enter your first name"
                        {...field}
                        id="firstName"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
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
                        placeholder="Enter your last name"
                        {...field}
                        id="lastName"
                      />
                    </FormControl>
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
                        placeholder="Enter username here"
                        {...field}
                        id="userName"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1 col-span-2">
                    <Label htmlFor="Email">Email</Label>

                    <FormControl className="">
                      <Input
                        type="text"
                        className=""
                        disabled={isLoading}
                        placeholder="name.example@gmail.com"
                        {...field}
                        id="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CardFooter className="justify-end gap-3 mt-6">
            <Button variant="outline" type="submit">
              Cancel{" "}
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
