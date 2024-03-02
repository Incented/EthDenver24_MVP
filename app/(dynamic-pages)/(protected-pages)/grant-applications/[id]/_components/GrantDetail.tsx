import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { FC, Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { checkIfUserPrioritizedGrantProject, updateGrantProjectStatusAction } from "@/data/user/grant-projects";
import { getGrantProgramById } from "@/data/user/grants";
import { Table } from "@/types";
import moment from "moment";
import Link from "next/link";
import { z } from "zod";
import { AttachmentClient } from "../../../grants/[id]/submit-application/components/AttachmentClient";
import { grantProjectTypesSchema } from "../../../grants/[id]/submit-application/components/CreateGrantApplicationFormSchema";
import GrantApplicationAttributes from "./GrantApplicationAttributes";
import { TaskFileArray } from "./GrantApplicationDetail";
import { PrioritizeGrantDialog } from "./PrioritizeGrantDialog";

async function GrantProgramDetails({
  organizationId,
}: {
  organizationId: string;
}) {
  const grant = await getGrantProgramById(organizationId);
  const grantName = grant.title;
  const grantPrioritizationReward =
    grant.prioritization_reward_percentage;
  const grantValidationReward = grant.validation_reward_percentage;
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <p>{grantName}</p>
      <TooltipWrapper
        tooltipTrigger={<Info size={18} className="cursor-pointer" />}
        tooltipContent={
          <div>
            <p className="mb-2 text-sm">Grant Details</p>
            <p className="mb-1 text-xs">
              Prioritization Reward Percentage{" "}
              {grantPrioritizationReward
                ? `${grantPrioritizationReward}%`
                : "Not specified"}
            </p>
            <p className="text-xs">
              Validation Reward Percentage{" "}
              {grantValidationReward
                ? `${grantValidationReward}%`
                : "Not specified"}
            </p>
          </div>
        }
      />
    </div>
  );
}
interface GrantDetailProps {
  grant: Table<"grant_applications">;
  grantProgram: Table<"grant_programs">;
  loggedInUserId: string;
  grantProjectPrioritizations: Table<"grant_project_prioritizations">[];
  grantCreator: Table<"user_profiles">;
}

export const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);
const GrantDetail: FC<GrantDetailProps> = async ({ grant, grantProgram, loggedInUserId, grantProjectPrioritizations, grantCreator
}) => {
  const organizationId = grant.organization_id;
  const imageUrl = "/images/task1.jpeg";

  const [isPrioritizedByLoggedInUser] = await Promise.all([
    checkIfUserPrioritizedGrantProject(grant.id),
  ]);

  const grantPrioritizationPeriod = grantProgram.prioritization_period;
  const grantPrioritizationQuorum = grantProgram.prioritization_quorum_percentage;
  const isWithinPrioritizedPeriod = Date.now() < new Date(grant.created_at).getTime() + grantPrioritizationPeriod! * 24 * 60 * 60 * 1000;

  let lowerPriority = 0;
  let higherPriority = 0;

  grantProjectPrioritizations.forEach(detail => {
    if (detail.count < 0) {
      lowerPriority += Math.abs(detail.count);
    } else {
      higherPriority += detail.count;
    }
  });

  let totalVotes = lowerPriority + higherPriority;
  let currentGrantPrioritizationQuorum = (higherPriority / (totalVotes)) * 100;

  if (grant.grant_project_status === "new_application" && grantProjectPrioritizations.length !== 0) {
    await updateGrantProjectStatusAction({ status: "prioritized", grantProjectId: grant.id });
  }

  // if (grant.grant_project_status === "prioritized" && currentGrantPrioritizationQuorum >= grantPrioritizationQuorum) {
  //   await updateGrantProjectStatusAction({ status: "project", grantProjectId: grant.id });
  // }

  let files: TaskFileArray = [];
  let grantProjectTypes: string[] = [];

  try {
    const arg =
      typeof grant.files === "string" ? JSON.parse(grant.files) : grant.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof grant.grant_project_types === "string"
        ? JSON.parse(grant.grant_project_types)
        : grant.grant_project_types;
    grantProjectTypes = grantProjectTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }
  const firstFile = files[0];
  const featuredImageUrl = firstFile?.url ?? imageUrl;

  const deadLine = String(grant.efforts);

  const createdAt = moment(grant.created_at);
  const timeSincePosted = createdAt.fromNow();
  return (
    <div className="p-8 bg-accent/50">
      {/* <pre>{grant.grant_project_status}</pre>
      <pre>{JSON.stringify(totalVotes, null, 2)}</pre>
      <pre>{JSON.stringify(lowerPriority, null, 2)}</pre>
      <pre>{JSON.stringify(higherPriority, null, 2)}</pre>
      <pre>{JSON.stringify(currentGrantPrioritizationQuorum, null, 2)}</pre>
      <pre>{JSON.stringify(grantPrioritizationQuorum, null, 2)}</pre> */}
      <Suspense fallback={<div>Loading...</div>}>
        <GrantProgramDetails organizationId={organizationId} />
      </Suspense>
      <div className="mb-4 flex flex-wrap gap-3">
        {grantProjectTypes.map((grantProjectType) => (
          <Badge variant={"outline"} key={grantProjectType}>
            {grantProjectType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Posted {timeSincePosted}</p>
      {grant.grant_project_status === "project" ? (
        <div className="flex gap-4 items-baseline">
          <h1 className="mb-6 text-2xl font-semibold">{grant.name}</h1>
          <Link href={`/grants/${grant.organization_id}/projects/${grant.id}`} className=" text-sm text-primary underline underline-offset-2 hover:text-foreground transition-colors">
            View Project
          </Link>
        </div>
      ) :
        <h1 className="mb-6 text-2xl font-semibold">{grant.name}</h1>
      }
      <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${featuredImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="md:grid md:grid-cols-4 md:gap-8 w-full">

        {/* {taskDescription} */}
        <div className="col-span-1 flex flex-col max-w-lg gap-4 ">
          <PrioritizeGrantDialog grantProjectId={grant.id} isGrantApplicationCreator={loggedInUserId === grant.user_id} isPrioritizedByLoggedInUser={isPrioritizedByLoggedInUser} isWithinPrioritizedPeriod={isWithinPrioritizedPeriod} isUserMemberOfCommunity={true} />
          <Card className="shadow-none p-4 mb-4 flex flex-col gap-4 bg-transparent border-secondary-foreground/20">
            <h1 className="text-sm leading-[14px] font-medium">Proposer</h1>
            <div className="flex items-center gap-[10px]">
              <Avatar>
                <AvatarImage src={grantCreator?.avatar_url || ""} />
                <AvatarFallback>{grantCreator?.full_name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-foreground">{grantCreator?.full_name}</p>
            </div>
          </Card>
          <div className="w-64 mb-6">
            <GrantApplicationAttributes
              amount={String(grant.grant_amount)}
              efforts={deadLine}
              deadline={deadLine}
            />
          </div>
        </div>
        {grant.description && (
          <div
            className="col-span-3 prose prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
            dangerouslySetInnerHTML={{ __html: grant.description as string }}
          />
        )}


      </div>
      <AttachmentClient attachments={files} />
    </div>
  );
};

export default GrantDetail;
