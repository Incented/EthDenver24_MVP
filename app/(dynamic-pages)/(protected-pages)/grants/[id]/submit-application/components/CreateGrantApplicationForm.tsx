"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  BasicGrantApplicationFormSchema,
  CreateGrantApplicationFormSchema,
  CreateMilestoneForGrantSchema,
  createGrantApplicationFormSchema
} from "./CreateGrantApplicationFormSchema";
// import { TipTap } from "./TipTap";
import { Attachment } from "@/components/Attachment";
import { AttachmentDialog } from "@/components/AttachmentDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { createGrantApplicationAction } from "@/data/user/grant-projects";
import { useToastMutation } from "@/hooks/useToastMutation";
import axios from "axios";
import { File } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { grant_project_type_slug } from "../../../../grant-applications/[id]/grantTypes";
import { AttachmentType, FilePreview } from "./CreateTaskFormTypes";
import { UploadFiles } from "./uploadFile";

const TipTap = dynamic(() => import("@/components/tip-tap-Editor/TipTap"), {
  ssr: false,
});

export function CreateGrantApplicationForm({
  grantProjectTypes,
  grantProgramId,
}: {
  grantProjectTypes: { name: string; id: number; slug: string }[];
  grantProgramId: string;
}) {
  const [isSubmittingProposal, setIsSubmittingProposal] =
    useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

  const [taskFileUrls, setTaskFilesUrls] = useState<
    { name: string; url: string }[]
  >([]);

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

  function handleAddMilestone() {
    append({ grant_project_id: grantProgramId, milestone_title: '', milestone_description: '', milestone_effort: 2, milestone_budget: 2 });
  }

  const toggleTypeSelection = (
    typeName: grant_project_type_slug,
    currentSelected: grant_project_type_slug[]
  ): grant_project_type_slug[] => {
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
    watch,
    formState: { errors },
  } = useForm<CreateGrantApplicationFormSchema>({
    resolver: zodResolver(createGrantApplicationFormSchema),
    mode: "onChange",
    defaultValues: {
      grant_project_title: "This is the title",
      grant_project_summary: "This is the task description",
      grant_project_types: ["compute-networks"],
      grant_project_amount: 10,
      grant_project_files: [],
      grant_milestones: [{
        grant_project_id: grantProgramId,
        milestone_title: "Milestone 1",
        milestone_description: "This is the milestone description",
        milestone_effort: 10,
        milestone_budget: 1000,
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "grant_milestones",
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
    async ({
      grantProjectData, grant_milestones
    }: {
      grantProjectData: BasicGrantApplicationFormSchema, grant_milestones: CreateMilestoneForGrantSchema[]
    }) => {
      const files = grantProjectData.grant_project_files;
      const amount = grantProjectData.grant_project_amount;
      const title = grantProjectData.grant_project_title;
      const description = grantProjectData.grant_project_summary;
      const types = grantProjectData.grant_project_types;

      return await createGrantApplicationAction({
        grant_program_id: grantProgramId,
        grant_project_title: title,
        grant_project_summary: description,
        grant_amount: amount,
        grant_project_files: files,
        grant_project_types: types,
        grant_project_status: isSubmittingProposal ? "new_application" : "draft",
        is_grant_published: isSubmittingProposal,
        grant_milestones
      });
    },
    {
      loadingMessage: "Creating..",
      errorMessage: "Failed to submit grant application",
      successMessage: "Successful",
      onSuccess: (grantApplicationId => {
        router.push(`/grant-applications/${grantApplicationId}`);
      })
    }
  );




  const onSubmit = (values: CreateGrantApplicationFormSchema) => {
    console.log("Form values: ", values);

    // Map the fields from `values` to the structure expected by `createTaskAction`
    const grantApplicationData = {
      grant_program_id: grantProgramId,
      grant_project_title: values.grant_project_title,
      grant_project_summary: values.grant_project_summary,
      grant_project_amount: values.grant_project_amount, // Corrected property name
      grant_project_files: values.grant_project_files, // Ensure this casting is appropriate based on your schema
      grant_project_types: values.grant_project_types || [],
      grant_project_status: isSubmittingProposal ? "new_application" : "draft",
      is_grant_published: isSubmittingProposal,
    };

    mutate({
      grant_milestones: values.grant_milestones,
      grantProjectData: grantApplicationData
    });

  };

  const handleOpenSubmitDialog = (submitType: 'publish') => {
    setIsSubmittingProposal(submitType === "publish");
    setIsDialogOpen(true); // Open the dialog to confirm submission
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid gap-6 md:grid-cols-1 w-full"
      >

        <div className="max-w-2xl w-full flex gap-4">
          <div className="w-full space-y-1">
            <Label>Project title</Label>
            <Input
              {...register("grant_project_title")}
              placeholder="Project title"
              className="w-full"
            />
            {errors.grant_project_title?.message && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.grant_project_title?.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 max-w-3xl">
            <div className="space-y-1 w-full">
              <Label>Grant Amount (USD)</Label>
              <Input
                {...register("grant_project_amount", {
                  valueAsNumber: true,
                })}
                placeholder="Amount of carrots"
                className="w-fit"
              />
              {errors.grant_project_amount?.message && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.grant_project_amount?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <Label>Project Summary</Label>
          <Card className="mt-1">
            <Controller
              name="grant_project_summary"
              control={control}
              render={({ field }) => <TipTap {...field} />}
            />
          </Card>
          {errors.grant_project_summary?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.grant_project_summary?.message}
            </p>
          )}
        </div>

        <div className=" space-y-2">
          <Label>Project Types</Label>
          <div className=" flex flex-wrap w-full gap-3 *:cursor-pointer *:rounded-full *:text-xs *:h-5 *:leading-4 *:p-0 *:px-[10px] *:border-none *:hover:border-1 *:font-medium">
            <Controller
              control={control}
              name="grant_project_types"
              render={({ field }) => (
                <>
                  {grantProjectTypes.map((type) => (
                    <Button
                      key={type.name}
                      onClick={(e) => {
                        e.preventDefault();
                        const currentSelectedTypes = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const newSelectedTypes = toggleTypeSelection(
                          type.slug as grant_project_type_slug,
                          currentSelectedTypes
                        );
                        field.onChange(newSelectedTypes);
                      }}

                      className={` ${field.value.includes(type.slug as grant_project_type_slug)
                        ? "bg-foreground text-background hover:bg-foreground/50 hover:text-background"
                        : "bg-secondary hover:bg-secondary/50"
                        }`}
                      variant="secondary"
                    >
                      {type.name}
                    </Button>
                  ))}
                </>
              )}
            />
          </div>
          {errors.grant_project_types?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.grant_project_types?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 max-w-3xl">
          <Label>Upload</Label>
          <Controller
            control={control}
            name="grant_project_files"
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
                </>
              );
            }}
          />
          {errors.grant_project_files?.message && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {errors.grant_project_files?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-2 justify-start ">
          {fields.map((field, index) => (
            <div key={field.id} className="mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label>Milestone title</Label>
                  <Input {...register(`grant_milestones.${index}.milestone_title`)} placeholder="Milestone Name" className="w-full" />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <Label>Effort (days)</Label>
                  <Input {...register(`grant_milestones.${index}.milestone_effort`, {
                    valueAsNumber: true,
                  })} placeholder="10" />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <Label>Budget (USD)</Label>
                  <Input {...register(`grant_milestones.${index}.milestone_budget`, {
                    valueAsNumber: true,
                  })} placeholder="10" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Milestone description</Label>
                <Input {...register(`grant_milestones.${index}.milestone_description`)} placeholder="Milestone Description" />
              </div>
              <Button type="button" variant='ghost' className="w-fit uppercase text-sm text-destructive" onClick={() => remove(index)} >- Remove Milestone</Button>
            </div>
          ))}
          <Button type="button" variant='ghost' className="absolute bottom-0 left-48 w-fit uppercase text-sm text-primary" onClick={handleAddMilestone}>
            + Add Milestone
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Attachments</Label>
          <div>
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
        </div>
        <div className="flex gap-2 w-full pr-2 md:gap-4 ">
          <Button variant="outline" type="submit" data-submit-type="draft" className="w-full md:w-fit">
            Save as draft
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild><Button
              data-submit-type="publish"
              onClick={() => handleOpenSubmitDialog('publish')}
              className="w-full md:w-fit">
              Submit Proposal
            </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                Are you sure you want to submit this proposal?
              </DialogHeader>
              <div className="flex gap-2">
                <Button className="w-full" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                }}>
                  Cancel
                </Button>
                <Button className="w-full" type="button" onClick={() => {
                  setIsDialogOpen(false); // Close the dialog first
                  handleSubmit(onSubmit)(); // Programmatically submit the form
                }}>
                  Submit Proposal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
}

export default CreateGrantApplicationForm;
