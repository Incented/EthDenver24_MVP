import Detail from "./Detail";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { getTaskById } from "@/data/user/tasks";
import { z } from "zod";
import { taskTypesSchema } from "../../create-task/components/CreateTaskFormSchema";

const rabbitHole = "Buan Fund";
const imageUrl = "/images/task1.jpeg";
// const taskTypes = ["Construction", "Validation", "Prioritization"];

const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);

type TaskFileArray = z.infer<typeof filesSchema>;

interface TaskDetailProps {
  id: string;
}
// http://localhost:3000/dashboard/tasks/b9af7c90-f276-449d-a14b-511f12524e9d
const DraftTaskDetail: FC<TaskDetailProps> = async ({ id }: { id: string }) => {
  const task = await getTaskById(id);
  console.log("task", task);
  let files: TaskFileArray = [];
  let taskTypes: string[] = [];

  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof task.task_types === "string"
        ? JSON.parse(task.task_types)
        : task.task_types;
    taskTypes = taskTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }
  const firstFile = files[0];
  const featuredImageUrl = firstFile?.url ?? imageUrl;
  return (
    <div className="w-full space-y-4 mt-4">
      {/* TODO: adjust the space-y-[10px] */}
      <div className="space-y-[10px] md:gap-0 md:flex md:items-center md:justify-between">
        <h1 className="col-span-2 font-medium rounded-md row-start-2 mt-4 text-3xl md:col-span-1">
          Draft Preview
        </h1>
        <div className="ml-auto flex justify-between md:gap-2">
          <Button className="px-2 py-3 " variant={"outline"}>
            Edit Draft Proposal
          </Button>
          <Button className="w-32">Submit Proposal</Button>
        </div>
      </div>
      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="relative mb-4 border-none">
          <h3 className="text-center bg-muted rounded-t-md font-semibold text-muted-foreground text-xs py-1.5">
            Draft
          </h3>
          <Detail
            taskTitle={task.name}
            taskDescription={task.description}
            taskTypes={taskTypes}
            rabbitHole={rabbitHole}
            imageUrl={featuredImageUrl}
            deadLine={"3 days 7 hours"}
            rewards={String(task.rewards) ?? undefined}
            efforts={String(task.efforts) ?? undefined}
            attachments={files.map((file) => file.url)}
          />
        </Card>
      </section>
    </div>
  );
};

export default DraftTaskDetail;
