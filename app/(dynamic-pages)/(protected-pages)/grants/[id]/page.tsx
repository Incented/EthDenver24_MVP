

import { Button } from "@/components/ui/button";
import { getGrantProgramById } from "@/data/user/grants";
import Link from "next/link";
import { z } from "zod";
import { Periods } from "../../communities/create-community/_components/createCommunitySchema";
import { GrantRewardSettingsSchema } from "../create-grant/_components/createGrantSchema";

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
  const [grant] =
    await Promise.all([
      getGrantProgramById(id),
    ]);

  const rewards: GrantRewardSettingsSchema = {
    proposalReward: grant.proposal_absolute_reward ?? 0,
    prioritizationReward: grant.prioritization_reward_percentage ?? 0,
    validationReward: grant.validation_reward_percentage ?? 0,
    claimStakeAmount: grant.claim_stake_amount_percentage ?? 100,
  };

  const periods: Periods = {
    prioritizationPeriod: grant.prioritization_period ?? 0,
    contributionPeriod: grant.contribution_period ?? 0,
    validationPeriod: grant.validation_period ?? 0,
  };

  const grantUrls = {
    website: grant.website_url ?? "",
    facebook: grant.facebook_url ?? "",
    twitter: grant.twitter_url ?? "",
    linkedin: grant.linkedin_url ?? "",
    youtube: grant.youtube_url ?? "",
    instagram: grant.instagram_url ?? "",
  };

  return (
    <div className="relative mx-4 mb-10 sm:mx-8">
      <pre>{JSON.stringify(id, null, 2)}</pre>
      <Link href={`/grants/${id}/submit-application`}>
        <Button>Submit application</Button>
      </Link>
    </div>
  );
}
