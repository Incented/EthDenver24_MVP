import { Input } from "@/components/ui/input";
import { AccordionList } from "./Accordion";
import { rewardAccordionItems } from "./createCommunityData";
import {
  RewardSettingsSchema,
  rewardSettingsSchema,
} from "./createCommunitySchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/Progress";

export default function RewardsSettingsForm({
  rewardSettings,
  setRewardsSettings,
  currentStep,
  setCurrentStep,
}: {
  rewardSettings: RewardSettingsSchema | undefined;
  setRewardsSettings: (data: RewardSettingsSchema) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RewardSettingsSchema>({
    resolver: zodResolver(rewardSettingsSchema),
    defaultValues: {
      proposalReward: rewardSettings?.proposalReward ?? 0,
      prioritizationReward: rewardSettings?.prioritizationReward ?? 0,
      validationReward: rewardSettings?.validationReward ?? 0,
      claimStakeAmount: rewardSettings?.claimStakeAmount ?? 100,
    },
  });

  const onSubmit: SubmitHandler<RewardSettingsSchema> = (data) => {
    const numericData = {
      ...data,
      proposalReward: Number(data.proposalReward),
      prioritizationReward: Number(data.prioritizationReward),
      validationReward: Number(data.validationReward),
      claimStakeAmount: Number(data.claimStakeAmount),
    };
    setRewardsSettings(numericData);
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    localStorage.setItem("currentStep", String(newStep));
    // localStorage.setItem("rewardSettings", JSON.stringify(data));
  };

  //   useEffect(() => {
  //     const savedRewardSettings = localStorage.getItem("rewardSettings");
  //     if (savedRewardSettings) {
  //       const parsedDetails = JSON.parse(savedRewardSettings);
  //       reset(parsedDetails); // This sets the form values to the saved data
  //     }
  //   }, [reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              Reward Settings
            </p>
            <p className="text-sm leading-6">
              Manage the task reward for your community members.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 3/6</p> <p>40%</p>
            </div>
            <div className="py-1.5">
              <Progress value={40} className="w-full h-2" />
            </div>
          </div>
        </div>

        <div className="h-full overflow-hidden">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 max-w-md">
                  <div className="relative w-40 space-y-1">
                    <span className="text-sm">Proposal Reward</span>
                    <Input
                      placeholder="0"
                      className=" pr-2"
                      {...register("proposalReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                      %
                    </p>
                    {errors.proposalReward?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.proposalReward?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative w-40 space-y-1">
                    <span className="text-sm">Prioritization Reward</span>
                    <Input
                      placeholder="0"
                      className=" pr-2"
                      {...register("prioritizationReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                      %
                    </p>
                    {errors.prioritizationReward?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.prioritizationReward?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative w-40 space-y-1">
                    <span className="text-sm">Validation Reward</span>
                    <Input
                      placeholder="0"
                      className=" pr-2"
                      {...register("validationReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                      %
                    </p>
                    {errors.validationReward?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.validationReward?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative w-40 space-y-1">
                    <span className="text-sm">Claim Stake Amount</span>
                    <Input
                      placeholder="100"
                      className=" pr-2"
                      {...register("claimStakeAmount", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                      %
                    </p>
                    {errors.claimStakeAmount?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.claimStakeAmount?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <AccordionList accordionItems={rewardAccordionItems} />
          </div>
        </div>
      </div>
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={() => {
              setCurrentStep(currentStep - 1);
              const savedStep = localStorage.getItem("currentStep");
              if (savedStep !== null) {
                localStorage.setItem(
                  "currentStep",
                  String(Number(savedStep) - 1)
                );
              }
            }}
            type="button"
          >
            Back
          </Button>{" "}
          <Button type="submit" className="w-[100px]">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
