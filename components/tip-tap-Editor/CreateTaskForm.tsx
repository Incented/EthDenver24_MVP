"use client";

import { ChangeEvent, FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createFormSchema } from "./CreateFormSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TipTap from "./TipTap";
import { Card } from "../ui/card";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface CreateTaskFormProps {}

const CreateTaskForm: FC<CreateTaskFormProps> = ({}) => {
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

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: "onChange",
    defaultValues: {
      // community: "",
      // taskTitle: "",
      taskDescription: "",
      taskType: "",
      reward: "",
      effort: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="community"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:w-1/3">
                <FormLabel className="">Community</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Community"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Bunan Fund">Bunan Fund </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            name="taskTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 sm:w-1/2">
                <FormLabel>Title</FormLabel>
                <FormControl className="">
                  <Input
                    {...field}
                    placeholder="Task title"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <Label>Task Description</Label>
            <Card className="mt-1">
              <FormField
                name="taskDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="">
                      <TipTap
                        description="Describe the task here"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <FormField
            control={form.control}
            name="taskType"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Task Type</FormLabel>

                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">Software Dev</Badge>
                  <Badge variant="outline">Hardware Dev</Badge>
                  <Badge variant="outline">Legal</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Marketing</Badge>
                </div>
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Task Type"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="software Dev">Software Dev</SelectItem>
                      <SelectItem value="hardware Dev">Hardware Dev</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            name="reward"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Rewards</FormLabel>
                <FormControl className="">
                  <Input {...field} placeholder="Rewards" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="effort"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Efforts</FormLabel>
                <FormControl className="">
                  <Input {...field} placeholder="Efforts" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <Label>Upload</Label>
            <Card className="relative mt-1 outline-dashed outline-gray-600">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl className="">
                      <>
                        <div className="flex items-center justify-center w-full h-[200px] mx-auto outline-0">
                          <Input
                            type="file"
                            accept="image/*"
                            placeholder=""
                            className="z-40 w-full h-full p-4 rounded-full opacity-0 cursor-pointer "
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                          <div
                            className={cn(
                              "h-full w-full absolute flex justify-center bg-cover bg-center group",
                              field.value
                                ? "bg-[rgba(22, 28, 36, 0.64)]"
                                : "bg-default-100"
                            )}
                            style={{
                              backgroundImage: `url(${field.value})`,
                              objectFit: "contain",
                            }}
                          >
                            <div
                              className={cn(
                                "flex  justify-center items-center flex-col gap-1 text-default-400",
                                field.value ? "opacity-0" : "opacity-1"
                              )}
                            >
                              <Upload />
                              <p className="text-tiny">
                                {field.value ? "Update Photo" : "Upload photo"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="col-span-2">
            <Label>Attachments</Label>
            <Card className="relative mt-1 outline-dashed outline-gray-600">
              <FormField
                control={form.control}
                name="attchament"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl className="">
                      <>
                        <div className="items-center w-full outline-0">
                          <Input
                            type="file"
                            accept="/*"
                            placeholder=""
                            className="z-50 w-full h-full rounded-full opacity-0 cursor-pointer "
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                          <div className="absolute flex gap-8 px-4 bottom-2">
                            <p className="text-tiny">
                              {field.value ? "Update File" : "Chose File"}
                            </p>
                            <p className="text-tiny">
                              {field.value?.slice(5, 20)}
                            </p>
                          </div>
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>
          <div className="absolute flex gap-4 top-8 right-4">
            <Button type="button" variant="outline">
              Save draft
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTaskForm;
