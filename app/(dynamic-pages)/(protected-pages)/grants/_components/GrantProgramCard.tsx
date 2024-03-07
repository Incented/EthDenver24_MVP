import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MDXRemote } from 'next-mdx-remote/rsc';


import Link from "next/link";

import { customMDXComponents } from "@/components/mdxComponents";
import {
  getTeamMembersCountInOrganization,
  getTeamMembersInOrganization
} from "@/data/user/organizations";
import { cn } from "@/lib/utils";


type GrantProgramCardProps = {
  communityName: string;
  communityDescription?: string;
  communityImage?: string;
  communityTasks?: number;
  communityAddress?: string;
  communityId: string;
  communityCreatedBy?: string;
};

export async function GrantProgramCard({
  communityName,
  communityDescription,
  communityImage,
  communityTasks,
  communityAddress,
  communityId: id,
  communityCreatedBy,
}: GrantProgramCardProps) {
  const [communityMembers, members] = await Promise.all([
    getTeamMembersCountInOrganization(id),
    getTeamMembersInOrganization(id),
  ]);

  return (
    <Link href={`/grants/${id}`} className="w-full">
      <Card className="w-full gap-4 p-6 rounded-lg cursor-pointer overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-4 w-full">
          <Avatar>
            <AvatarImage
              src={communityImage}
              className="object-cover w-10 h-10 rounded-full"
            />
            <AvatarFallback>
              {communityName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate line-clamp-1 w-full">
            <p
              className="text-base font-bold leading-7 text-foreground truncate"
            >
              {communityName ?? "Community Name"}
            </p>
            <p className="text-xs text-muted-foreground ">
              {communityAddress ?? "New York, USA"}
            </p>
          </div>
        </div>

        {communityDescription ? (
          <div className="w-full max-w-md ">
            <div
              className={cn(
                'truncate line-clamp-1',

                'prose-p:text-muted-foreground prose-p:text-sm',

                'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
                // headings
                'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
                // lead
                'prose-lead:text-muted-foreground dark:prose-lead:text-slate-400',
                // links
                'prose-a:font-semibold dark:prose-a:text-sky-400',
                // link underline
                'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
                // pre
                'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
                // hr
                'dark:prose-hr:border-slate-800',
              )}
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              <MDXRemote
                source={communityDescription}
                components={customMDXComponents}
              />
            </div>

          </div>
        ) : (
          <p className="mb-4 w-full text-sm text-muted-foreground truncate">
            "Buan onsulting is a community of developers"
          </p>
        )}

        <div className="w-full flex items-center gap-3 mb-4">
          <div className="">
            <p className="text-base font-bold leading-7">
              {communityTasks ?? 100}
            </p>
            <p className="text-xs leading-[14px] text-muted-foreground">
              Active Tasks
            </p>
          </div>
          <div className="h-[35px] w-[1px] bg-muted" />

          <div className="">
            <p className="text-base font-bold leading-7">{communityMembers}</p>
            <p className="text-xs leading-[14px] text-muted-foreground">
              Total members
            </p>
          </div>
        </div>

        {/* {isMember ? (
        <JoinCommunityModal
          triggerText="Join"
          community={communityName}
          userId={communityCreatedBy}
        />
      ) : (
        <JoinCommunityModal triggerText="Join" community={communityName} />
      )} */}
      </Card>
    </Link >
  );
}

export default GrantProgramCard;
