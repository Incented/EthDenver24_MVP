

import { Search } from "@/components/Search";
import GoBack from "@/components/ui/GoBack";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getGrantApplicationsByGrantId } from "@/data/user/grant-projects";
import { getGrantProgramById } from "@/data/user/grants";
import { cn, parseJsonToStringArray } from "@/lib/utils";
import { Table } from "@/types";
import { Filter } from "lucide-react";
import Image from "next/image";
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
                <Button className="w-full px-4 py-2 mt-4 text-primary-foreground bg-orange-500 rounded hover:bg-orange-600">
                  Apply
                </Button>
              </Link>
            </div>

          </Card>
        </div>
      </Card>

      <div className="items-center mx-4 md:flex">
        <Typography.H3 className="mt-4 mb-6">Grant Applications</Typography.H3>
        <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
          <Search placeholder="Search Application" />
          <Button>
            <Filter size={20} className="mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid w-full mx-4 gap-4">
        {grantApplications
          .sort((a, b) => {
            if (a.grant_project_status === "project" && b.grant_project_status !== "project") {
              return -1;
            } else if (a.grant_project_status !== "project" && b.grant_project_status === "project") {
              return 1;
            } else {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
          })
          .map((application) => (
            <div key={application.id} className="flex gap-4">
              <div className={cn("relative flex flex-col  bg-primary h-full w-[240px] rounded-lg p-6 items-center justify-start",
                application.grant_project_status === "project" ? "flex bg-primary" : "hidden"
              )}>
                <div className="relative flex flex-col h-fit pt-8 gap-10">
                  <div className="relative flex justify-center place-items-center ">
                    <svg width="64" height="64" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="z-50 stroke-primary fill-primary/10" >
                      <g clipPath="url(#clip0_22_469)">
                        <path d="M4 6.00001H3C2.55797 6.00001 2.13405 5.82442 1.82149 5.51185C1.50893 5.19929 1.33334 4.77537 1.33334 4.33334C1.33334 3.89132 1.50893 3.46739 1.82149 3.15483C2.13405 2.84227 2.55797 2.66668 3 2.66668H4M4 6.00001V1.33334H12V6.00001M4 6.00001C4 7.06088 4.42143 8.07829 5.17158 8.82844C5.92172 9.57858 6.93914 10 8 10C9.06087 10 10.0783 9.57858 10.8284 8.82844C11.5786 8.07829 12 7.06088 12 6.00001M12 6.00001H13C13.442 6.00001 13.866 5.82442 14.1785 5.51185C14.4911 5.19929 14.6667 4.77537 14.6667 4.33334C14.6667 3.89132 14.4911 3.46739 14.1785 3.15483C13.866 2.84227 13.442 2.66668 13 2.66668H12M2.66667 14.6667H13.3333M6.66667 9.77334V11.3333C6.66667 11.7 6.35334 11.9867 6.02 12.14C5.23334 12.5 4.66667 13.4933 4.66667 14.6667M9.33334 9.77334V11.3333C9.33334 11.7 9.64667 11.9867 9.98 12.14C10.7667 12.5 11.3333 13.4933 11.3333 14.6667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_22_469">
                          <rect width="16" height="16" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="absolute z-0">
                      <div className="relatives size-32">
                        <Image fill src="/images/polygon.png" alt="bg" />
                      </div>
                    </div>
                  </div>

                  <Typography.Large className="text-primary-foreground font-semibold -mb-2">Grant winner</Typography.Large>
                </div>

              </div>
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
              /></div>
          ))
        }
      </div >
      {/* <div className="py-4 ">
        <Pagination
          title="Applications"
          totalPages={10}
          count={3}
        />
      </div> */}
    </div >
  );
}

