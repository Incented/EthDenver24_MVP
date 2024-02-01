import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCommunitySchema } from "./createCommunitySchema";
import { Progress } from "@/components/ui/Progress";
import CommunityInfo from "../../[id]/_components/CommunityInfo";
import CommunityMembers from "../../[id]/_components/CommunityMembers";
import CommunityDetailsTopCards from "../../[id]/_components/CommunityDetailsTopCards";
import CarrotPotCard from "../../[id]/_components/CarrotPotCard";
import PeriodsCard from "../../[id]/_components/PeriodsCard";
import PriorityCards, {
  PriorityCard,
} from "../../[id]/_components/PriorityCards";
import { Card } from "@/components/ui/card";
import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import PeriodsCardSlim from "../../[id]/_components/PeriodsCardSlim";

export function FinalReviewForm({
  basicDetails,
  rewardSettings,
  protocolConfiguration,
  prev,
  onSubmit,
}: {
  basicDetails: any;
  rewardSettings: any;
  protocolConfiguration: any;
  prev: () => void;
  onSubmit: SubmitHandler<CreateCommunitySchema>;
}) {
  const { handleSubmit } = useForm<CreateCommunitySchema>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-tid="create-community-form"
      className="w-full"
    >
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[760px] 2xl:h-[760px] lg:">
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
                communityUrls={{
                  website: basicDetails?.website || "",
                  facebook: basicDetails?.facebook || "",
                  twitter: basicDetails?.twitter || "",
                  linkedin: basicDetails?.linkedin || "",
                  youtube: basicDetails?.youtube || "",
                }}
              />
              {/* <PeriodsCard
                periods={{
                  prioritizationPeriod:
                    protocolConfiguration?.prioritizationPeriod || 0,
                  contributionPeriod:
                    protocolConfiguration?.contributionPeriod || 0,
                  validationPeriod:
                    protocolConfiguration?.validationPeriod || 0,
                }}
              /> */}
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
              <div className="flex flex-col col-span-2 gap-4 w-full md:flex-row xl:flex-col">
                <PriorityCard />
                <PriorityCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={() => {
              prev();
            }}
            type="button"
          >
            Back
          </Button>{" "}
          <Button variant="default" type="submit" className="w-full">
            Create Community
          </Button>
        </div>
      </div>
    </form>
  );
}
