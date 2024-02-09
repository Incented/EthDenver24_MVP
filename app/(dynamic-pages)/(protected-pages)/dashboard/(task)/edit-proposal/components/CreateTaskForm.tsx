"use client";

import { ChangeEvent, FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { CreateFormSchema, createFormSchema } from "./CreateFormSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { TipTap } from "./TipTap";
import { Card } from "../../../../../../../components/ui/card";
import { Button } from "../../../../../../../components/ui/button";
import { AddTaskTypeDialog } from "../../../../../../../components/presentational/AddTaskTypeDialog";
import { createTaskType } from "@/data/user/tasks";
import dynamic from "next/dynamic";

const TipTap = dynamic(
  () => import("../../../../../../../components/tip-tap-Editor/TipTap"),
  { ssr: false }
);

export function CreateTaskForm({
  taskTypes,
  communityNames,
}: {
  taskTypes: Array<{ name: string }>;
  communityNames: Array<{ title: string }>;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleTypeSelection = (typeName: string) => {
    setSelectedTypes((currentTypes) => {
      if (currentTypes.includes(typeName)) {
        return currentTypes.filter((type) => type !== typeName); // Remove the type if it's already selected
      } else {
        return [...currentTypes, typeName]; // Add the type if it's not selected
      }
    });
  };
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

  const { register, control, handleSubmit, formState } =
    useForm<CreateFormSchema>({
      resolver: zodResolver(createFormSchema),
      mode: "onChange",
      defaultValues: {
        // community: "",
        // taskTitle: "",
        taskDescription: "",
        taskType: [""],
        reward: "",
        effort: "",
        imageUrl: "",
      },
    });

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    console.log(values);
  };

  const isLoading = formState.isSubmitting;

  return (
    <div className="">
      {/* <AddTaskTypeDialog createTaskType={createTaskType} /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-1"
      >
        <div className="w-56 space-y-1">
          <Label>Community</Label>
          <Controller
            name="community"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger aria-label="Select community" className="pr-2">
                  <SelectValue
                    placeholder="Select community"
                    defaultValue={field.value}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {communityNames.map((community, index) => (
                      <SelectItem
                        key={community.title || `Community ${index + 1}`}
                        value={community.title || `Community ${index + 1}`}
                        defaultValue={field.value}
                      >
                        {community.title || `Community ${index + 1}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className=" w-56 space-y-1">
          <Label>Title</Label>
          <Input
            {...register("taskTitle")}
            placeholder="Task title"
            className="w-full"
          />
        </div>

        <div className="">
          <Label>Task Description</Label>
          <Card className="mt-1">
            <Controller
              name="taskDescription"
              control={control}
              render={({ field }) => <TipTap {...field} />}
            />
          </Card>
        </div>

        <div className=" space-y-2">
          <Label>Task Types</Label>
          <div className="flex flex-wrap w-full gap-3">
            {taskTypes.map((type) => (
              <Button
                key={type.name}
                onClick={(e) => {
                  e.preventDefault();
                  toggleTypeSelection(type.name);
                }}
                className={`cursor-pointer rounded-full border-none hover:border hover:border-1 text-xs font-medium leading-4 h-5 p-0 px-[10px] ${
                  selectedTypes.includes(type.name)
                    ? "bg-foreground text-background hover:bg-foreground/50 hover:text-background"
                    : "bg-secondary hover:bg-secondary/50"
                }`}
                variant="outline"
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="space-y-1">
            <Label>Rewards</Label>
            <Input
              {...register("reward")}
              placeholder="Amount of carrots"
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <Label>Efforts (days)</Label>
            <Input
              {...register("effort")}
              placeholder="Total days to effort"
              className="w-full"
            />
          </div>
        </div>

        <div className="">
          <Label>Upload</Label>
          <Card className="relative mt-1 outline-dashed outline-gray-600">
            {/* <FormField
              control={control}
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
            /> */}
          </Card>
        </div>

        <div className="">
          <Label>Attachments</Label>
          {/* <Card className="relative mt-1 outline-dashed outline-gray-600">
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
                <p className="text-tiny">{field.value?.slice(5, 20)}</p>
              </div>
            </div>
          </Card> */}
        </div>
        <div className="absolute flex gap-4 top-8 right-4">
          <Button type="button" variant="outline">
            Save draft
          </Button>
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskForm;
