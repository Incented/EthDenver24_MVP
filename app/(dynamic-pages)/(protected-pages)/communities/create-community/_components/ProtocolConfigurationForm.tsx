import { Input } from "@/components/ui/input";
import { AccordionList } from "./Accordion";
import { protocolAccordionItems } from "./createCommunityData";
import {
  ProtocolConfigurationSchema,
  protocolConfigurationSchema,
} from "./createCommunitySchema";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/components/ui/Progress";
import { useEffect } from "react";

export default function ProtocolConfigurationForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
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
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              Protocol Configuration
            </p>
            <p className="text-sm leading-6">
              Manage your community parameters such as protocol fees,
              carrot-pot, validation quorum, etc.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 2/6</p> <p>20%</p>
            </div>
            <div className="py-1.5">
              <Progress value={20} className="w-full h-2" />
            </div>
          </div>
        </div>

        <div className=" h-[484px] overflow-auto ">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-base leading-9 font-normal">Quorum</h3>
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

                    <p className="mt-0 absolute left-3 top-1/2 text-muted-foreground">{`>`}</p>
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
                    <p className="mt-0 absolute left-3 top-1/2 text-muted-foreground">{`>`}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base leading-9 font-normal">Periods</h3>
                <div className="mt-2 grid grid-rows-auto md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-[160px] md:w-fit">
                  <div className="relative space-y-1">
                    <span className="text-sm">Prioritization Period</span>
                    <Input
                      placeholder="0"
                      {...register("prioritizationPeriod", {
                        valueAsNumber: true,
                      })}
                    />

                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
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
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
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
                    <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
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
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={moveToPrevStep}
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
