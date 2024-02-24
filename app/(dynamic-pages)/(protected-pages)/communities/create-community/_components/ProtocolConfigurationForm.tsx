"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { AccordionList } from "./Accordion";
import { protocolAccordionItems } from "./createCommunityData";
import {
  ProtocolConfigurationSchema,
  protocolConfigurationSchema,
} from "./createCommunitySchema";

function ProtocolConfigurationForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
  withStep = true,
}: FormProps<ProtocolConfigurationSchema>) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProtocolConfigurationSchema>({
    resolver: zodResolver(protocolConfigurationSchema),
    defaultValues: {
      prioritizationQourum: initialFormValues?.prioritizationQourum ?? 0,
      validationQuorum: initialFormValues?.validationQuorum ?? 0,
      prioritizationPeriod: initialFormValues?.prioritizationPeriod ?? 0,
      contributionPeriod: initialFormValues?.contributionPeriod ?? 0,
      validationPeriod: initialFormValues?.validationPeriod ?? 0,
    },
  });

  const onSubmit: SubmitHandler<ProtocolConfigurationSchema> = (data) => {
    const numericData = {
      ...data,
      prioritizationQourum: Number(data.prioritizationQourum),
      validationQuorum: Number(data.validationQuorum),
      prioritizationPeriod: Number(data.prioritizationPeriod),
      contributionPeriod: Number(data.contributionPeriod),
      validationPeriod: Number(data.validationPeriod),
    };
    onFormSubmit(numericData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 rounded-b-none rounded-lg md:h-[550px]">
        <div className=" h-[484px] overflow-auto ">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 px-1 space-y-6">
              <div>
                <h3 className="text-base font-normal leading-9">Quorum</h3>
                <div className="grid grid-rows-auto md:grid-cols-1 gap-4 w-[160px] md:w-fit">
                  <div className="relative space-y-1">
                    <span className="text-sm">Prioritization Quorum</span>
                    <Input
                      placeholder="0"
                      className="pl-6"
                      {...register("prioritizationQourum", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.prioritizationQourum?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.prioritizationQourum?.message}
                      </p>
                    )}

                    <p className="absolute mt-0 left-3 top-1/2 text-muted-foreground">{`>`}</p>
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Validation Quorum</span>
                    <Input
                      placeholder="0"
                      className="pl-6"
                      {...register("validationQuorum", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.validationQuorum?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.validationQuorum?.message}
                      </p>
                    )}
                    <p className="absolute mt-0 left-3 top-1/2 text-muted-foreground">{`>`}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base font-normal leading-9">Periods</h3>
                <div className="mt-2 grid grid-rows-auto md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-[160px] md:w-fit">
                  <div className="relative space-y-1">
                    <span className="text-sm">Prioritization Period</span>
                    <Input
                      placeholder="0"
                      {...register("prioritizationPeriod", {
                        valueAsNumber: true,
                      })}
                    />

                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
                      days
                    </p>
                    {errors.prioritizationPeriod?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.prioritizationPeriod?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Contribution Period</span>
                    <Input
                      placeholder="0"
                      {...register("contributionPeriod", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
                      days
                    </p>
                    {errors.contributionPeriod?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.contributionPeriod?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Validation Period</span>
                    <Input
                      placeholder="0"
                      {...register("validationPeriod", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="absolute text-sm right-2 top-1/2 text-muted-foreground">
                      days
                    </p>
                    {errors.validationPeriod?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.validationPeriod?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <AccordionList accordionItems={protocolAccordionItems} />
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

export default ProtocolConfigurationForm;
