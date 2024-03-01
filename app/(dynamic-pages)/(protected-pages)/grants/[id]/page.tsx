

import { Search } from "@/components/Search";
import GoBack from "@/components/ui/GoBack";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getGrantApplicationsByGrantId } from "@/data/user/grant-projects";
import { getGrantProgramById } from "@/data/user/grants";
import { parseJsonToStringArray } from "@/lib/utils";
import { Table } from "@/types";
import { Filter } from "lucide-react";
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



  return (
    <div className="relative mx-4 my-4 mb-10 sm:mx-8">
      <GoBack />
      <Card className="p-4 border-none shadow-none ">
        <div className="flex flex-col gap-4 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <Typography.H2>{grantProgram.title}</Typography.H2>
            <Typography.P className="text-primary">Active</Typography.P>
            <Separator className="my-2" />
            <Typography.P className="text-sm text-muted-foreground">Managed by: {grantProgram.title}</Typography.P>
            <div className="mt-4 space-y-2">
              <Card className="flex justify-between p-4 shadow-none">
                <Typography.P className="text-lg font-medium">Grant Pool</Typography.P>
                <Typography.P className="text-lg font-semibold text-primary">{grantProgram.grant_pool} ARB</Typography.P>
              </Card>
              <Card className="flex justify-between p-4 shadow-none">
                <Typography.P className="text-lg font-medium">Prioritization Reward Pool</Typography.P>
                <Typography.P className="text-lg font-semibold text-primary">{grantProgram.prioritization_reward_percentage! * 4 * 10} ARB</Typography.P>
              </Card>
              <Card className="flex justify-between p-4 shadow-none">
                <Typography.P className="text-lg font-medium">Slash Percentage</Typography.P>
                <Typography.P className="text-lg font-semibold text-primary">{grantProgram.slash_percentage} %</Typography.P>
              </Card>
            </div>
          </div>
          <Card className="flex-1 p-8 space-y-4 border-none shadow-none bg-muted">
            <div className="flex flex-col justify-between h-full">
              <div
                className="max-w-full mb-6 text-base prose prose-lg text-muted-foreground prose-slate dark:prose-invert prose-headings:font-display font-default focus:outline-none"
                dangerouslySetInnerHTML={{ __html: grantProgram.description as string }}
              />
              <Link href={`/grants/${id}/submit-application`}>
                <Button className="w-full px-4 py-2 mt-4 text-white bg-orange-500 rounded hover:bg-orange-600">
                  Apply
                </Button>
              </Link>
            </div>

          </Card>
        </div>
      </Card>

      <div className="items-center md:flex">
        <Typography.H3 className="mt-4 mb-6">Grant Applications</Typography.H3>
        <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
          <Search placeholder="Search Application" />
          <Button>
            <Filter size={20} className="mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid w-full gap-4">
        {grantApplications.filter(application => application.grant_project_status !== "draft").map((application) => (
          <GrantApplicationCard
            key={application.id}
            grantTitle={application.name}
            grantDescription={application.description ?? ""}
            imageUrl={getGrantApplicationFeaturedImage(application)}
            grantId={application.id}
            grantProgramId={application.organization_id}
            grantProgram={grantProgram}
            grantProjectStatus={application.grant_project_status}
            grantProjectType={parseJsonToStringArray(application.grant_project_types)}
            isVertical
          />
        ))}
      </div>
      {/* <div className="py-4 ">
        <Pagination
          title="Applications"
          totalPages={10}
          count={3}
        />
      </div> */}
    </div>
  );
}

