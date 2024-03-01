import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn, getGrantProjectBgClass } from "@/lib/utils";
import { Table } from "@/types";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FC, Suspense } from "react";
import { z } from "zod";
import GrantDetail from "./GrantDetail";
import { SubmitDraftGrantDialog } from "./SubmitDraftGrantDialog";

export const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);

export type TaskFileArray = z.infer<typeof filesSchema>;

interface GrantApplicationDetailProps {
  grant: Table<"grant_applications">;
  grantProgram: Table<"grant_programs">;
  milestones: Table<"grant_project_milestones_2">[];
  loggedInUserId: string;
  grantProjectPrioritizations: Table<"grant_project_prioritizations">[];
  grantCreator: Table<"user_profiles">;
}
// http://localhost:3000/dashboard/tasks/b9af7c90-f276-449d-a14b-511f12524e9d
const GrantApplicationDetail: FC<GrantApplicationDetailProps> = async ({
  grant,
  grantProgram,
  milestones,
  loggedInUserId,
  grantProjectPrioritizations,
  grantCreator,
}: {
  grant: Table<"grant_applications">;
  grantProgram: Table<"grant_programs">;
  milestones: Table<"grant_project_milestones_2">[];
  loggedInUserId: string;
  grantProjectPrioritizations: Table<"grant_project_prioritizations">[];
  grantCreator: Table<"user_profiles">;
}) => {

  let grantStatusBg = "bg-black";

  grantStatusBg = getGrantProjectBgClass(grant.grant_project_status);


  return (
    <div className="w-full space-y-4 mt-4">
      <div className="space-y-[10px] md:gap-0 md:flex md:items-center md:justify-between">
        {grant.grant_project_status === "draft" && (
          <>
            <h1 className="col-span-2 h-[54px] font-medium rounded-md row-start-2 mt-4 text-3xl md:col-span-1">
              {grant.grant_project_status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            <div className="ml-auto flex justify-between md:gap-2">
              <Link href={`/grant-applications/${grant.id}/edit-draft-application`}>
                <Button className="px-2 py-3 " variant={"outline"}>
                  Edit Draft Proposal
                </Button>
              </Link>
              <SubmitDraftGrantDialog id={grant.id} />
            </div>
          </>
        )}
      </div>
      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="relative mb-4 bg-muted overflow-hidden border-none">
          <Card className="shadow-none rounded-none relative bg-accent/50 overflow-hidden border-none">
            <div
              className={cn(
                " px-6 py-1 text-sm w-fit text-white rounded-br-md ",
                grantStatusBg
              )}
            >
              {grant.grant_project_status?.split("-")
                .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace("_", " ")}
            </div>
          </Card>
          {grant.grant_project_status === "draft" && (
            <h3 className="text-center bg-secondary rounded-t-md font-semibold text-muted-foreground text-xs py-1.5">
              {grant.grant_project_status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <GrantDetail grant={grant} grantProgram={grantProgram} loggedInUserId={loggedInUserId} grantProjectPrioritizations={grantProjectPrioritizations}
              grantCreator={grantCreator}
            />
          </Suspense>
        </Card>
      </section>

      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="p-8 relative mb-4 bg-muted overflow-hidden border-none">
          <Typography.Large>Milestones</Typography.Large>
          <div className="flex flex-col gap-6">
            {milestones.map((milestone, index) =>
              <div key={index} className="flex flex-col gap-2">
                <div className="flex flex-wrap md:grid md:grid-cols-3 w-full gap-4">
                  <div><Typography.Small className="font-normal">Milestone {index + 1} :</Typography.Small> <Typography.Small className="font-semibold">{milestone.name}</Typography.Small></div>
                  <div><Typography.Small className="font-normal">Effort Estimate :</Typography.Small> <Typography.Small className="font-semibold">{milestone.efforts} days</Typography.Small></div>
                  <div><Typography.Small className="font-normal">Budget :</Typography.Small> <Typography.Small className="font-semibold"> ${milestone.grant_project_milestone_amount} USD</Typography.Small></div>
                </div>
                <Typography.Small className="font-normal">Milestone Description: </Typography.Small>
                <div
                  className="prose text-sm prose-lg prose-slate dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
                  dangerouslySetInnerHTML={{ __html: milestone.description as string }}
                />
              </div>
            )}
          </div>

        </Card>
      </section>

      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="p-8 mb-4 overflow-hidden border-none bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold ">Discussion</h1>
            <Button variant="ghost" className="text-primary">
              <Plus size={16} />
              Add New Topic
            </Button>
          </div>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/assets/avatar_1.jpg" />
            </Avatar>

            <Textarea placeholder="Type a new topic here." />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default GrantApplicationDetail;
