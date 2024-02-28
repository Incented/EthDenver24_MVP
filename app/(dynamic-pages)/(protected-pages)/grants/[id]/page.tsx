

import GoBack from "@/components/ui/GoBack";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGrantApplicationsByGrantId } from "@/data/user/grant-projects";
import { getGrantProgramById } from "@/data/user/grants";
import { Table } from "@/types";
import Link from "next/link";
import { z } from "zod";
import { TaskFileArray, filesSchema } from "../../grant-applications/[id]/_components/GrantApplicationDetail";
import GrantApplicationCard from "./_components/GrantApplicationCard";

const paramsSchema = z.object({
  id: z.coerce.string(),
});

export default async function GrantDetailsPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { id } = parsedParams;
  const [grantProgram, grantApplications] =
    await Promise.all([
      getGrantProgramById(id),
      getGrantApplicationsByGrantId(id),
    ]);

  const getGrantApplicationFeaturedImage = (grant: Table<"grant_applications">) => {
    const imageUrl = "/images/task1.jpeg";
    let files: TaskFileArray = []; // Assuming TaskFileArray is correctly typed
    try {
      const arg =
        typeof grant.files === "string" ? JSON.parse(grant.files) : grant.files;
      files = filesSchema.parse(arg); // This should ensure files is TaskFileArray
    } catch (error) {
      console.log(error);
    }

    let featuredImageUrl = imageUrl;
    // After parsing and validation, we know what `files` is, so we use it directly
    if (files.length > 0 && files[0].url) {
      featuredImageUrl = files[0].url; // Correctly typed access to `url`
    }

    return featuredImageUrl;
  };


  function parseJsonToStringArray(grant_project_types: string | number | boolean | { [key: string]: import("../../../../../lib/database.types").Json | undefined; } | import("../../../../../lib/database.types").Json[] | null): string[] {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="relative mx-4 my-10 mb-10 sm:mx-8">
      <GoBack />
      <Card className=" p-6 border-none shadow-none">
        <div className="flex flex-col space-y-4 gap-12 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <Typography.H2>{grantProgram.title}</Typography.H2>
            <Typography.P className="text-sm text-muted-foreground">Managed by: The Arbitrum Foundation</Typography.P>
            <div className="mt-4 space-y-2">
              <Card className="shadow-none p-4 flex justify-between">
                <Typography.P className="text-lg font-medium">Grant Pool</Typography.P>
                <Typography.P className="text-primary text-lg font-semibold">{grantProgram.grant_pool} ARB</Typography.P>
              </Card>
              <Card className="shadow-none p-4 flex justify-between">
                <Typography.P className="text-lg font-medium">Prioritization Reward Pool</Typography.P>
                <Typography.P className="text-primary text-lg font-semibold">{grantProgram.prioritization_reward_percentage! * 4 * 10} ARB</Typography.P>
              </Card>
              <Card className="shadow-none p-4 flex justify-between">
                <Typography.P className="text-lg font-medium">Slash Percentage</Typography.P>
                <Typography.P className="text-primary text-lg font-semibold">{grantProgram.slash_percentage} %</Typography.P>
              </Card>
            </div>
          </div>
          <Card className="flex-1 space-y-4 shadow-none border-none bg-muted p-8">
            <div>
              <p className="text-lg font-medium">
                The Arbitrum Foundation Grant Program supports builders with milestones-based funding for growth. All
                grants issued through this program will serve to improve the adoption of Arbitrum chains, create stronger
                technical structures, and build sustainable communities in the Arbitrum ecosystem.
              </p>
              <h4 className="mt-4 text-lg font-semibold">Who are we looking for</h4>
              <p className="text-lg">Currently accepting applications for Decentralized Applications ("dApps")</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Applications are now open</h4>
              <p className="text-lg">
                Applications are being approved on a rolling basis. To maximize the impact of our grant program, we will
                be tracking milestone progress for all approved applicants.
              </p>
              <Link href={`/grants/${id}/submit-application`}>
                <Button className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  Apply
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-4 w-full">
        {grantApplications.map((application) => (
          <GrantApplicationCard
            key={application.id}
            grantTitle={application.name}
            grantDescription={application.description ?? ""}
            imageUrl={getGrantApplicationFeaturedImage(application)}
            grantId={application.id} grantProgramId={application.organization_id} grantProgram={grantProgram} grantProjectStatus={application.grant_project_status} grantProjectType={parseJsonToStringArray(application.grant_project_types)} />
        ))}
      </div>
    </div>
  );
}

