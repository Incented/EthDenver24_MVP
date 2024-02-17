"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  CreateTaskFormSchema,
  createTaskFormSchema,
} from "./CreateTaskFormSchema";
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddTaskTypeDialog } from "@/components/presentational/AddTaskTypeDialog";
import { createDraftTaskAction, createTaskType } from "@/data/user/tasks";
import dynamic from "next/dynamic";
import { File, Upload, XIcon } from "lucide-react";
import { UploadFiles } from "./uploadFile";
import axios from "axios";
import { useToastMutation } from "@/hooks/useToastMutation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Attachment, FilePreview } from "./Attachment";

const TipTap = dynamic(() => import("@/components/tip-tap-Editor/TipTap"), {
  ssr: false,
});

export function CreateTaskForm({
  taskTypes,
  communities,
}: {
  taskTypes: Array<{ name: string; id: number; slug: string }>;
  communities: Array<{ title: string; id: string }>;
}) {
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

  const [taskFileUrls, setTaskFilesUrls] = useState<
    { name: string; url: string }[]
  >([]);

  interface Attachment {
    file: File;
    previewUrl: string;
  }

  const [selectedAttachment, setSelectedAttachment] =
    useState<Attachment | null>(null);

  const openPreview = (preview: FilePreview) => {
    if ("file" in preview) {
      setSelectedAttachment({
        file: preview.file,
        previewUrl: preview.previewUrl,
      });
    } else {
      // Workaround: Explicitly declaring the type of the 'File' constructor
      const emptyFile: File = new (File as any)([], preview.name, {
        type: "application/octet-stream",
      });
      setSelectedAttachment({
        file: emptyFile,
        previewUrl: preview.url,
      });
    }
  };

  const closePreview = () => {
    setSelectedAttachment(null);
  };

  const [communityid, setCommunityId] = useState<string>("");

  const handleFiles = (files: File[], paths: string[]) => {
    const newFilePreviews = files.map((file, index) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      path: paths[index],
    }));

    setFilePreviews((currentPreviews) => [
      ...currentPreviews,
      ...newFilePreviews, // This now correctly matches the updated state type
    ]);
  };

  const deleteFileMutation = useToastMutation<
    { message: string }, // Expected success response type
    Error, // Error type
    { path: string } // Variables type, assuming you need the file path to delete
  >(
    async ({ path }) => {
      // Call your API endpoint to delete the file
      const response = await axios.delete("/api/tasks/deleteFile", {
        data: { path },
      });
      return response.data;
    },
    {
      loadingMessage: "Deleting file...",
      successMessage: "File deleted successfully!",
      errorMessage: "Failed to delete file",
    }
  );

  // Function to handle file deletion
  const handleDeleteFile = (path: string, index: number) => {
    deleteFileMutation.mutate(
      { path },
      {
        onSuccess: () => {
          // Remove the file preview from the state after successful deletion
          setFilePreviews((prev) => prev.filter((_, i) => i !== index));
        },
        // Optionally handle onError to customize error handling
      }
    );
  };

  type task_slug =
    | "software-dev"
    | "hardware-dev"
    | "legal"
    | "marketing"
    | "labor"
    | "finance"
    | "design"
    | "manufacturing"
    | "research"
    | "communications"
    | "interview"
    | "translation"
    | "writing"
    | "data-analytics"
    | "operations"
    | "administrative"
    | "planning"
    | "construction"
    | "other";

  const toggleTypeSelection = (
    typeName: task_slug,
    currentSelected: task_slug[]
  ): task_slug[] => {
    const isSelected = currentSelected.includes(typeName);
    if (isSelected) {
      return currentSelected.filter((type) => type !== typeName);
    } else {
      return [...currentSelected, typeName];
    }
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
    mode: "onChange",
    defaultValues: {
      community_id: "",
      task_description: "",
      task_types: ["software-dev"],
      task_rewards: 0,
      task_efforts: 0,
      task_files: [],
    },
  });

  console.log("Errors", errors);

  useEffect(() => {
    return () => {
      // Clean up the object URLs
      filePreviews.forEach((preview) => {
        // Check if the preview is of type ExtendedFilePreview and has a previewUrl
        if ("previewUrl" in preview) {
          URL.revokeObjectURL(preview.previewUrl);
        }
      });
    };
  }, [filePreviews]);

  const router = useRouter();

  const { mutate } = useToastMutation(
    async (taskData: CreateTaskFormSchema) => {
      const community_id = taskData.community_id;
      const task_files = taskData.task_files;
      const rewards = taskData.task_rewards;
      const efforts = taskData.task_efforts;
      const title = taskData.task_title;
      const description = taskData.task_description;
      const types = taskData.task_types;

      return await createDraftTaskAction({
        community_id,
        task_title: title,
        task_description: description,
        task_rewards: rewards,
        task_efforts: efforts,
        task_files: task_files,
        task_types: types,
        task_status: "draft",
      });
    },
    {
      loadingMessage: "Creating task draft...",
      errorMessage: "Failed to create draft ",
      successMessage: "Draft task created!",
      onSuccess: (data) => {
        console.log("Task created", data);
        router.push(`/dashboard/tasks/${data.id}`);
      },
    }
  );

  const onSubmit = async (values: CreateTaskFormSchema) => {
    console.log("Form values: ", values);
    console.log(values.task_files);

    // Map the fields from `values` to the structure expected by `createDraftTaskAction`
    const taskData = {
      community_id: communityid,
      task_title: values.task_title,
      task_description: values.task_description,
      task_rewards: values.task_rewards,
      task_efforts: values.task_efforts,
      task_files: values.task_files, // Ensure this casting is appropriate based on your schema
      task_types: values.task_types || [],
      task_status: "draft", // Assuming "draft" is a valid value for your task_status enum
    };

    console.log("Task data", taskData);

    mutate(taskData);
  };

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
            name="community_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                name={field.name}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  const selectedCommunity = communities.find(
                    (community) => community.title === value
                  );
                  setCommunityId(selectedCommunity?.id || "");
                }}
              >
                <SelectTrigger aria-label="Select community" className="pr-2">
                  <SelectValue
                    placeholder="Select community"
                    defaultValue={field.value}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {communities.map((community, index) => (
                      <SelectItem
                        key={`${community.title}-${index}`}
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
          {errors.community_id?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.community_id?.message}
            </p>
          )}
        </div>

        <div className=" w-56 space-y-1">
          <Label>Title</Label>
          <Input
            {...register("task_title")}
            placeholder="Task title"
            className="w-full"
          />
          {errors.task_title?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.task_title?.message}
            </p>
          )}
        </div>

        <div className="">
          <Label>Task Description</Label>
          <Card className="mt-1">
            <Controller
              name="task_description"
              control={control}
              render={({ field }) => <TipTap {...field} />}
            />
          </Card>
          {errors.task_description?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.task_description?.message}
            </p>
          )}
        </div>

        <div className=" space-y-2">
          <Label>Task Types</Label>
          <div className="flex flex-wrap w-full gap-3">
            <Controller
              control={control}
              name="task_types"
              render={({ field }) => (
                <>
                  {taskTypes.map((type) => (
                    <Button
                      key={type.name}
                      onClick={(e) => {
                        e.preventDefault();
                        const currentSelectedTypes = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const newSelectedTypes = toggleTypeSelection(
                          type.slug as task_slug,
                          currentSelectedTypes
                        );
                        field.onChange(newSelectedTypes);
                      }}
                      className={`cursor-pointer rounded-full border-none hover:border hover:border-1 text-xs font-medium leading-4 h-5 p-0 px-[10px] ${
                        field.value.includes(type.slug as task_slug)
                          ? "bg-foreground text-background hover:bg-foreground/50 hover:text-background"
                          : "bg-secondary hover:bg-secondary/50"
                      }`}
                      variant="outline"
                    >
                      {type.name}
                    </Button>
                  ))}
                </>
              )}
            />
          </div>
          {errors.task_types?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.task_types?.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 max-w-3xl">
          <div className="space-y-1 w-full">
            <Label>Rewards</Label>
            <Input
              {...register("task_rewards", {
                valueAsNumber: true,
              })}
              placeholder="Amount of carrots"
              className="w-full"
            />
            {errors.task_rewards?.message && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.task_rewards?.message}
              </p>
            )}
          </div>
          <div className="space-y-1 w-full">
            <Label>Efforts (days)</Label>
            <Input
              {...register("task_efforts", {
                valueAsNumber: true,
              })}
              placeholder="Total days to effort"
              className="w-full"
            />
            {errors.task_efforts?.message && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.task_efforts?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-3xl">
          <Label>Upload</Label>
          <Controller
            control={control}
            name="task_files"
            render={({ field }) => {
              return (
                <>
                  <UploadFiles
                    onUpload={(filesInfo: { name: string; url: string }[]) => {
                      field.onChange(filesInfo);
                      console.log("Uploaded files", filesInfo);
                      setTaskFilesUrls(filesInfo); // Update the local state if you're using it to display the paths
                    }}
                    showFilePreviews={handleFiles}
                  />
                  {/* <UploadFiles
                    onUpload={(paths) => {
                      field.onChange(paths);
                      setPaths(paths);
                    }}
                    showFilePreviews={handleFiles}
                  /> */}
                  {/* <UploadFiles
                    onUpload={(publicUrl) => {
                      // Assuming publicUrl contains the path and publicUrl

                      // Update the form field with the new file path
                      const updatedUrls = Array.isArray(field.value)
                        ? [...field.value, publicUrl]
                        : [publicUrl];
                      field.onChange(updatedUrls);

                      // Add the file preview
                      const filename =
                        publicUrl.split("/").pop() || "defaultName"; // Ensure there's a fallback filename
                      setFilePreviews((prevPreviews) => [
                        ...prevPreviews,
                        { file: new File([], filename), previewUrl: publicUrl },
                      ]);
                    }} */}
                  {/* /> */}
                  {/* <UploadFiles onUpload={handleFiles} /> */}
                </>
              );
            }}
          />
          {/* <Card className="relative mt-1 outline-dashed outline-border outline-1">
            <div className="flex items-center justify-center w-full h-[200px] mx-auto">
              <Input
                type="file"
                accept="image/*"
                placeholder=""
                className="z-40 w-full h-full p-4 rounded-full opacity-0 cursor-pointer "
                // onChange={(e) => handleImage(e, field.onChange)}
              />
              <div
                className={cn(
                  "h-full w-full absolute flex justify-center bg-cover bg-center group"
                  // field.value ? "bg-[rgba(22, 28, 36, 0.64)]" : "bg-default-100"
                )}
                // style={{
                //   backgroundImage: `url(${field.value})`,
                //   objectFit: "contain",
                // }}
              >
                <div
                  className={cn(
                    "flex  justify-center items-center flex-col gap-1 text-default-400"
                    // field.value ? "opacity-0" : "opacity-1"
                  )}
                >
                  <Upload />
                  <p className="text-tiny">Upload photo</p>
                </div>
              </div>
            </div>
          </Card> */}
          {errors.task_files?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.task_files?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label>Attachments</Label>
          <div>
            <div className="flex flex-wrap gap-2">
              {filePreviews.map((preview, index) => (
                <Attachment
                  key={preview.path}
                  preview={preview}
                  openPreview={openPreview}
                  handleDeleteFile={handleDeleteFile}
                  index={index}
                />
              ))}
            </div>

            {selectedAttachment && (
              <Dialog open={!!selectedAttachment} onOpenChange={closePreview}>
                <DialogContent className="w-auto h-auto max-w-4xl max-h-screen overflow-y-auto p-4">
                  {/* Image Preview */}
                  {selectedAttachment.file.type.startsWith("image/") && (
                    <img
                      src={selectedAttachment.previewUrl}
                      alt={selectedAttachment.file.name}
                      className="max-w-full max-h-screen"
                    />
                  )}

                  {/* PDF Preview */}
                  {selectedAttachment.file.type === "application/pdf" && (
                    <iframe
                      src={selectedAttachment.previewUrl}
                      title="PDF Preview"
                      style={{ width: "100%", height: "500px" }} // Adjust size as needed
                    />
                  )}

                  {/* Fallback for Unsupported File Types */}
                  {!(
                    selectedAttachment.file.type.startsWith("image/") ||
                    selectedAttachment.file.type === "application/pdf"
                  ) && <p>Unsupported file type</p>}
                </DialogContent>
              </Dialog>
            )}
          </div>
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
