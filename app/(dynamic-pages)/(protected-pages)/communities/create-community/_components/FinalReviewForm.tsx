import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateCommunitySchema,
  BasicCommunityDetailsSchema,
  RewardSettingsSchema,
  ProtocolConfigurationSchema,
} from "./createCommunitySchema";
import { Progress } from "@/components/ui/Progress";
import CommunityInfo from "../../[id]/_components/CommunityInfo";
import CommunityDetailsTopCards from "../../[id]/_components/CommunityDetailsTopCards";
import { PriorityCardsForDisplay } from "../../[id]/_components/PriorityCards";
import { Button } from "@/components/ui/button";
import PeriodsCardSlim from "../../[id]/_components/PeriodsCardSlim";

export function FinalReviewForm({
  basicDetails,
  rewardSettings,
  protocolConfiguration,
  moveToPrevStep,
  onSubmit,
  isLoading,
}: {
  basicDetails: BasicCommunityDetailsSchema | undefined;
  rewardSettings: RewardSettingsSchema | undefined;
  protocolConfiguration: ProtocolConfigurationSchema | undefined;
  moveToPrevStep: () => void;
  onSubmit: SubmitHandler<CreateCommunitySchema>;
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
  const { handleSubmit } = useForm<CreateCommunitySchema>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-tid="create-community-form"
      className="w-full"
    >
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:h-[640px] 2xl:h-[760px] lg:">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              Final Review
            </p>
            <p className="text-sm leading-6">
              Assign roles and define permissions within the community.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 6/6</p> <p>100%</p>
            </div>
            <div className="py-1.5">
              <Progress value={100} className="w-full h-2" />
            </div>
          </div>
        </div>

        <div className=" overflow-y-auto w-full ">
          {/* Members */}
          <div className="flex flex-col gap-4 w-full">
            <CommunityDetailsTopCards rewards={rewardSettings} />
            <div className="flex flex-col w-full gap-4 lg:grid lg:grid-cols-2 xl:flex xl:flex-row">
              <CommunityInfo
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
              <PriorityCardsForDisplay
                prioritizationQourum={
                  protocolConfiguration?.prioritizationQourum ?? 25
                }
                validationQuorum={protocolConfiguration?.validationQuorum ?? 25}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
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
            Create Community
          </Button>
        </div>
      </div>
    </form>
  );
}
