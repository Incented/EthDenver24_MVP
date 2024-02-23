"use client";

import { Attachment } from "@/components/Attachment";
import { AttachmentDialog } from "@/components/AttachmentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { contributeToTaskAction } from "@/data/user/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AttachmentType, FilePreview } from "../../create-task/components/CreateTaskFormTypes";
import { UploadFiles } from "../../create-task/components/uploadFile";
import { ContributionFormSchema, contributionFormSchema } from "./ContributionFormSchema";

interface AddContributionProps {
  isClaimed?: boolean;
  isClaimer?: boolean;
  task_id: string;
}

const AddContribution: FC<AddContributionProps> = ({ isClaimed, isClaimer, task_id }) => {


  const [isSheetOpen, setIsSheetOpen] = useState(false);

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


  const { handleSubmit, control, register, setValue } = useForm<ContributionFormSchema>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      description: "",
      links: [{ link: "" }], // Start with one empty link
      contribution_files: [],
    },
  });

  // Use 'useFieldArray' for dynamic form fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  function handleAddLink() {
    // This will add a new input to the links array
    append({ link: "" });
  }

  const router = useRouter()

  const { mutate } = useToastMutation(
    async (data: ContributionFormSchema) => {
      const files = data.contribution_files || [];
      const links = data.links || [];
      const description = data.description;

      return await contributeToTaskAction({
        task_id: task_id,
        description,
        files,
        links,
      });
    },
    {
      loadingMessage: "Creating Contribution..",
      errorMessage: "Failed to submit proposal",
      successMessage: "Successful",
      onSuccess: (data) => {
        router.push(`/dashboard/tasks/${task_id}`);
        setIsSheetOpen(false);
      },
    }
  );

  function onSubmit(values: ContributionFormSchema) {
    mutate(values);
  }

  const [files, setFiles] = useState<File[]>([]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full">
        {
          isClaimed ? (
            <Button className="w-full" variant="default" disabled={!isClaimer}>Submit</Button>
          ) : (
            <Button className="w-full" disabled={isClaimed}
            >
              Contribute
            </Button>
          )
        }
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-start">Contribution</SheetTitle>
        </SheetHeader>
        <div className="my-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <Label className="text-sm leading-[14px]">Solution Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe your solution here"
              />
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-sm leading-[14px]">Upload</Label>
              <Controller
                control={control}
                name="contribution_files"
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
            <div className="space-y-1 w-full">
              <Label>Add link(s)</Label>
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <div key={field.id} className=" w-full">
                    <Input
                      {...register(`links.${index}.link`)} // Use register directly without casting
                      defaultValue={field.link} // Set up the default value
                      placeholder="https://"
                      className="w-full"
                    />
                    {/* <Button onClick={() => remove(index)} type="button" size="icon" variant="outline">
                      <X className="text-destructive" size={16} />
                    </Button> */}

                  </div>
                ))}
                <Button onClick={handleAddLink} type="button" variant="tertiary" size='icon' className="w-full">
                  <Plus size="16" />
                </Button>
              </div>
            </div>


            <div className="flex gap-2">
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </SheetContent >
    </Sheet >
  );
};

export default AddContribution;
