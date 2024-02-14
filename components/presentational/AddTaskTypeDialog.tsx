import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import slugify from "slugify";
import { TagsIcon } from "lucide-react";
import { useToastMutation } from "@/hooks/useToastMutation";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const taskTypeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
});

type TaskTypeFormType = z.infer<typeof taskTypeSchema>;

export const AddTaskTypeDialog = ({
  createTaskType,
}: {
  createTaskType: (data: TaskTypeFormType) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { control, register, handleSubmit, watch, setValue, formState } =
    useForm<TaskTypeFormType>({ resolver: zodResolver(taskTypeSchema) });

  const { mutate: createTaskTypeMutation, isLoading: isCreatingTaskType } =
    useToastMutation(
      async (payload: TaskTypeFormType) => {
        createTaskType(payload);
      },
      {
        loadingMessage: "Creating Task type...",
        successMessage: "Task type created!",
        errorMessage: "Failed to create task type",
        onSuccess: () => {
          router.refresh();
          setIsOpen(false);
        },
      }
    );

  const { isValid } = formState;
  const nameValue = watch("name");

  useEffect(() => {
    if (typeof nameValue === "string") {
      const slug = slugify(nameValue, {
        lower: true,
        strict: true,
        replacement: "-",
      });
      setValue("slug", slug);
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: TaskTypeFormType) => {
    console.log(data);
    createTaskTypeMutation(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Add task type
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <TagsIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Add task type</DialogTitle>
            <DialogDescription className="text-base">
              Fill in the details for the new task type.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            {/* <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            /> */}
            <Input placeholder="Name" {...register("name")} />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            {/* <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea {...field} placeholder="Description" />
              )}
            /> */}
            <Input placeholder="Description" {...register("description")} />
          </div>
          <div className="space-y-1">
            <Label>Slug</Label>
            {/* <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <Input disabled {...field} placeholder="Slug" />
              )}
            /> */}
            <Input disabled {...register("slug")} />
          </div>

          <DialogFooter className="w-full">
            <Button
              disabled={!isValid || isCreatingTaskType}
              type="submit"
              className="w-full"
            >
              {isCreatingTaskType ? "Submitting..." : "Submit Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
