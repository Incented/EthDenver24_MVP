import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table } from "@/types";
import Link from "next/link";
import { FC, Suspense } from "react";
import { z } from "zod";
import Detail from "./Detail";
import { SubmitDraftProposalDialog } from "./SubmitDraftProposalDialog";

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
      <div className="space-y-[10px] md:gap-0 md:flex md:items-center md:justify-between">
        <h1 className="col-span-2 h-[54px] font-medium rounded-md row-start-2 mt-4 text-3xl md:col-span-1">
          Draft Preview
        </h1>
        <div className="ml-auto flex justify-between md:gap-2">
          <Link href={`/dashboard/tasks/${id}/edit-task`}>
            <Button className="px-2 py-3 " variant={"outline"}>
              Edit Draft Proposal
            </Button>
          </Link>
          <SubmitDraftProposalDialog id={task.id} />
        </div>
      </div>
      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="relative mb-4 border-none">
          <h3 className="text-center bg-secondary rounded-t-md font-semibold text-muted-foreground text-xs py-1.5">
            Draft
          </h3>
          <Suspense fallback={<div>Loading...</div>}>
            <Detail task={task} />
          </Suspense>
        </Card>
      </section>
    </div>
  );
};

export default DraftTaskDetail;
