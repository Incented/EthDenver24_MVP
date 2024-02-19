import Detail from "./Detail";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { taskTypesSchema } from "../../create-task/components/CreateTaskFormSchema";
import { Table } from "@/types";
import {
  getOrganizationById,
  getOrganizationTitle,
} from "@/data/user/organizations";
import Link from "next/link";
import { useToastMutation } from "@/hooks/useToastMutation";
import { publishTaskAction } from "@/data/user/tasks";

const imageUrl = "/images/task1.jpeg";
// const taskTypes = ["Construction", "Validation", "Prioritization"];

export const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);

export type TaskFileArray = z.infer<typeof filesSchema>;

interface TaskDetailProps {
  id: string;
  task: Table<"tasks">;
}
// http://localhost:3000/dashboard/tasks/b9af7c90-f276-449d-a14b-511f12524e9d
const DraftTaskDetail: FC<TaskDetailProps> = async ({
  id,
  task,
}: {
  id: string;
  task: Table<"tasks">;
}) => {
  const community = await getOrganizationById(task.organization_id);
  const communityName = community.title;
  const communityPrioritizationReward =
    community.prioritization_reward_percentage;
  const communityValidationReward = community.validation_reward_percentage;

  let files: TaskFileArray = [];
  console.log("task", task);
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
      <form>
        <div className="space-y-[10px] md:gap-0 md:flex md:items-center md:justify-between">
          <h1 className="col-span-2 font-medium rounded-md row-start-2 mt-4 text-3xl md:col-span-1">
            Draft Preview
          </h1>
          <div className="ml-auto flex justify-between md:gap-2">
            <Link href={`/dashboard/tasks/${id}/edit-task`}>
              <Button className="px-2 py-3 " variant={"outline"}>
                Edit Draft Proposal
              </Button>
            </Link>
            <Button className="w-32" type="submit">
              Submit Proposal
            </Button>
          </div>
        </div>
        <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
          <Card className="relative mb-4 border-none">
            <h3 className="text-center bg-secondary rounded-t-md font-semibold text-muted-foreground text-xs py-1.5">
              Draft
            </h3>
            <Detail
              taskTitle={task.name}
              communityName={communityName}
              communityPrioritizationReward={communityPrioritizationReward}
              communityValidationReward={communityValidationReward}
              taskDescription={task.description}
              taskTypes={taskTypes}
              imageUrl={featuredImageUrl}
              deadLine={`${task.efforts} days`}
              rewards={String(task.rewards) ?? undefined}
              attachments={files}
            />
          </Card>
        </section>
      </form>
    </div>
  );
};

export default DraftTaskDetail;
