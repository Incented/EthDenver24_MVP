import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import CommunityDetailsTopCards from "../../[id]/_components/CommunityDetailsTopCards";
import CommunityInfo from "../../[id]/_components/CommunityInfo";
import PeriodsCardSlim from "../../[id]/_components/PeriodsCardSlim";
import { PriorityCard } from "../../[id]/_components/PriorityCards";
import {
  BasicGrantDetailsSchema,
  CreateGrantSchema,
  GrantProtocolConfigurationSchema,
  GrantRewardSettingsSchema
} from "./createGrantSchema";

export function GrantFinalReviewForm({
  basicDetails,
  rewardSettings,
  protocolConfiguration,
  moveToPrevStep,
  onSubmit,
  isLoading,
}: {
  basicDetails: BasicGrantDetailsSchema | undefined;
  rewardSettings: GrantRewardSettingsSchema | undefined;
  protocolConfiguration: GrantProtocolConfigurationSchema | undefined;
  moveToPrevStep: () => void;
  onSubmit: SubmitHandler<CreateGrantSchema>;
  isLoading: boolean;
}) {
  const getSocialLink = (type: string) =>
    basicDetails?.socialLinks?.find((link) => link.type === type)?.url || "";
  const communityUrls = {
    website: getSocialLink("website"),
    facebook: getSocialLink("facebook"),
    twitter: getSocialLink("twitter"),
    linkedin: getSocialLink("linkedin"),
    youtube: getSocialLink("youtube"),
  };
  const communityAvatarUrl = basicDetails?.avatarUrl || "";
  const { handleSubmit } = useForm<CreateGrantSchema>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-tid="create-community-form"
      className="w-full"
    >
      <div className="flex flex-col w-full gap-4 rounded-b-none rounded-lg md:h-[640px]">
        <div className="w-full overflow-y-auto ">
          {/* Members */}
          <div className="flex flex-col w-full gap-4">
            <CommunityDetailsTopCards rewards={rewardSettings} />
            <div className="flex flex-col w-full gap-4 lg:grid lg:grid-cols-2 xl:flex xl:flex-row">
              <CommunityInfo
                commuityFee={24}
                communityImage={communityAvatarUrl}
                communityName={basicDetails?.title || "Community name"}
                communityDescription={basicDetails?.description}
                communityUrls={communityUrls}
              />

              <PeriodsCardSlim
                periods={{
                  prioritizationPeriod:
                    protocolConfiguration?.prioritizationPeriod || 0,
                  contributionPeriod:
                    protocolConfiguration?.contributionPeriod || 0,
                  validationPeriod:
                    protocolConfiguration?.validationPeriod || 0,
                }}
              />
              <div className="flex flex-col w-full col-span-2 gap-4 md:flex-row xl:flex-col">
                <PriorityCard />
                <PriorityCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full p-6 py-4 pb-6 border rounded-lg rounded-t-none ">
        <div className="flex justify-start gap-2 mx-auto">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={moveToPrevStep}
            type="button"
            disabled={!moveToPrevStep || isLoading}
          >
            Back
          </Button>{" "}
          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            Create Grant Program
          </Button>
        </div>
      </div>
    </form>
  );
}
