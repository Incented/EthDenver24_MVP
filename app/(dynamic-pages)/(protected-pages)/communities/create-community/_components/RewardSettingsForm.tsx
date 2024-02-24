"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccordionList } from "./Accordion";
import { rewardAccordionItems } from "./createCommunityData";
import {
  RewardSettingsSchema,
  rewardSettingsSchema,
} from "./createCommunitySchema";

export default function RewardsSettingsForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
  withStep = true,
}: FormProps<RewardSettingsSchema>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RewardSettingsSchema>({
    resolver: zodResolver(rewardSettingsSchema),
    defaultValues: {
      proposalReward: initialFormValues?.proposalReward ?? 0,
      prioritizationReward: initialFormValues?.prioritizationReward ?? 0,
      validationReward: initialFormValues?.validationReward ?? 0,
      claimStakeAmount: initialFormValues?.claimStakeAmount ?? 100,
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
    onFormSubmit(numericData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 rounded-b-none rounded-lg md:md:h-[640px]">
        <div className="h-full overflow-hidden">
          <div className="flex flex-col h-full gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <div>
                <div className="grid max-w-md grid-cols-1 gap-4 px-1 mt-2 md:grid-cols-1 xl:grid-cols-2">
                  <div className="relative w-40 space-y-1">
                    <span className="text-sm">Proposal Reward</span>
                    <Input
                      placeholder="0"
                      className="pr-2 "
                      {...register("proposalReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
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
                      className="pr-2 "
                      {...register("prioritizationReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
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
                      className="pr-2 "
                      {...register("validationReward", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
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
                      className="pr-2 "
                      {...register("claimStakeAmount", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
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
      <div className="flex w-full p-6 py-4 pb-6 border rounded-lg rounded-t-none ">
        <div className="flex justify-start gap-2 mx-auto">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={withStep ? moveToPrevStep : () => { }}
            type="button"
          >
            {withStep ? "Back" : "Cancel"}
          </Button>

          <Button type="submit" className="w-[100px]">
            {withStep ? "Next" : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
