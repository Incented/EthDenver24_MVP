import { Table } from "@/types";
import { FC } from "react";
import { z } from "zod";
import { DraftTaskForm } from "./DraftTaskForm";

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
const DraftTaskDetail: FC<TaskDetailProps> = ({
  id,
  task,
}: {
  id: string;
  task: Table<"tasks">;
}) => {
  return (
    <div className="w-full space-y-4 mt-4">
      {/* TODO: adjust the space-y-[10px] */}
      <DraftTaskForm
        id={id}
        task={task}
      />
    </div>
  );
};

export default DraftTaskDetail;
