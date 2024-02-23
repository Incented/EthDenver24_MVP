"use client";

import { Attachment } from "@/components/Attachment";
import { AttachmentDialog } from "@/components/AttachmentDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { validateContributionAction } from "@/data/user/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { Table } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AttachmentClient } from "../../create-task/components/AttachmentClient";
import { AttachmentType, FilePreview } from "../../create-task/components/CreateTaskFormTypes";
import { UploadFiles } from "../../create-task/components/uploadFile";
import { ValidationFormSchema, validationFormSchema } from "./ContributionFormSchema";
import { FileWithUrl } from "./ContributionTypes";

interface ValidateDrawerProps {
  contribution: Table<"contributions">;
  contributorProfile: Table<"user_profiles">;
  task_id: string;
  loggedInUser: string
}


const ValidateSheet: FC<ValidateDrawerProps> = ({ contribution, contributorProfile, task_id, loggedInUser }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [actionType, setActionType] = useState<'validate' | 'invalidate'>('validate');

  const isContributor = loggedInUser === contribution.user_id;

  const [taskFileUrls, setTaskFilesUrls] = useState<
    { name: string; url: string }[]
  >([]);

  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

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

  const [selectedAttachment, setSelectedAttachment] =
    useState<AttachmentType | null>(null);

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
  const handleDeleteFile = (path: string) => {
    deleteFileMutation.mutate(
      { path },
      {
        onSuccess: () => {
          // Remove the file preview from the state after successful deletion
          setFilePreviews((prev) =>
            prev.filter((preview) => preview.path !== path)
          );
        },
        // Optionally handle onError to customize error handling
      }
    );
  };


  const { handleSubmit, control, register, setValue } = useForm<ValidationFormSchema>({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      description: "",
      // Start with one empty link
      count: 0,
      validation_files: [],
    },
  });

  const router = useRouter()

  const { mutate } = useToastMutation(
    async (data: ValidationFormSchema) => {
      const files = data.validation_files || [];
      const description = data.description;
      const count = data.count;

      return await validateContributionAction({
        contribution_id: contribution.id,
        description,
        task_id: contribution.task_id,
        count,
        files,
      });
    },
    {
      loadingMessage: "Creating Validation..",
      errorMessage: "Failed to submit validation",
      successMessage: "Successful",
      onSuccess: (data) => {
        router.push(`/dashboard/tasks/${contribution.task_id}`);
        setIsSheetOpen(false);
      },
    }
  );

  const handleValidate = () => {
    setActionType('invalidate')
    setIsSheetOpen(false)
  };

  function onSubmit(values: ValidationFormSchema) {
    const adjustedData = {
      ...values,
      count: actionType === 'invalidate' ? -Math.abs(values.count) : Math.abs(values.count),
    };
    mutate(adjustedData);
  }

  const [files, setFiles] = useState<File[]>([]);

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
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Button className=""
          disabled={isContributor}
        >Validate</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll flex flex-col gap-4 w-full max-w-lg">
        <SheetHeader>
          <SheetTitle className="mb-4 text-start">
            Validate Contribution
          </SheetTitle>
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={contributorProfile.avatar_url || ""}
                alt={contributorProfile.full_name || ""}
                className="object-cover rounded-full"
              />
              <AvatarFallback>{contributorProfile.full_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-xs">{contributorProfile.full_name}</p>
          </div>
        </SheetHeader>
        <div className="space-y-2">
          <h1 className="text-sm">Solution</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {contribution.description}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="mt-4 mb-2 text-sm">Photos</h1>

          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full"
          >
            <CarouselContent className="w-full">
              {(contribution.files as FileWithUrl[])?.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file.url)).map((file, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="w-[100px] h-[100px]">
                    <Image
                      width={200}
                      height={200}
                      src={file?.url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground truncate">{file.name}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-3 mt-8">
              <CarouselPrevious className="" />
              <CarouselNext className="" />
            </div>
          </Carousel>
        </div>
        <div className="mt-4">
          <AttachmentClient
            attachments={contribution.files as FileWithUrl[]}
          />
        </div>

        <Card className="p-3 my-4">
          <p className="mb-2 text-sm">Submit your validation</p>
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="carrotAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount of carrots</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stakeFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-background">.</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Stake for" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attchament"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Attachment
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Describe your solution here"
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="" size="sm" type="submit">
                Submit
              </Button>
            </form>
          </Form> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <Label className="text-sm leading-[14px]">Amount of carrots</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  {...register("count", { valueAsNumber: true, min: 0.01 })}
                  placeholder="0"
                  className="w-24"
                />
                <Select
                  onValueChange={(value) => setActionType(actionType as "validate" | "invalidate")} // Directly update the actionType state
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Stake for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valildate">stake for</SelectItem>
                    <SelectItem value="invalidate">stake against</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-sm leading-[14px]">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe your solution here"
              />
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-sm leading-[14px]">Upload</Label>
              <Controller
                control={control}
                name="validation_files"
                render={({ field }) => (
                  <>
                    <UploadFiles
                      onUpload={(filesInfo: { name: string; url: string }[]) => {
                        field.onChange(filesInfo);
                        console.log("Uploaded files", filesInfo);
                        setTaskFilesUrls(filesInfo); // Update the local state if you're using it to display the paths
                      }}
                      showFilePreviews={handleFiles}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Attachments</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {filePreviews.map((preview, index) => (
                    <Attachment
                      key={preview.path}
                      name={"file" in preview ? preview.file.name : preview.name}
                      onClick={() => openPreview(preview)}
                      onRemove={() => handleDeleteFile(preview.path)}
                    />
                  ))}
                </div>

                {selectedAttachment && (
                  <AttachmentDialog
                    onOpenChange={closePreview}
                    attachment={selectedAttachment}
                  />
                )}
              </div>
              {filePreviews.length === 0 && (
                <div className="flex justify-between p-4 py-2 pr-8 border rounded-md w-full ">
                  <p className="text-sm">Choose file</p>
                  <p className="text-sm">{files.length}</p>
                </div>
              )}
            </div>


            <div className="flex gap-2">
            </div>
            <Button className="w-full" type="submit" data-submit-type={actionType} onClick={handleValidate}>
              Submit
            </Button>
          </form>
        </Card>
      </SheetContent>
    </Sheet >
  );
};

export default ValidateSheet;
