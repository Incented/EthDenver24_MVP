"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  BasicCommunityDetailsSchema,
  basicCommunityDetailsSchema,
} from "./createCommunitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/components/ui/Progress";
import { useEffect, useState } from "react";
import { Facebook } from "lucide-react";
import SelectInput from "@/components/ui/SelectInput/SelectInput";

export default function BasicDetailsForm({
  basicDetails,
  setBasicDetails,
  currentStep,
  setCurrentStep,
}: {
  basicDetails: BasicCommunityDetailsSchema | undefined;
  setBasicDetails: (data: BasicCommunityDetailsSchema) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<BasicCommunityDetailsSchema>({
    resolver: zodResolver(basicCommunityDetailsSchema),
    defaultValues: {
      title: basicDetails?.title || "",
      description: basicDetails?.description || "",
      website: basicDetails?.website || "",
      facebook: basicDetails?.facebook || "",
      twitter: basicDetails?.twitter || "",
      linkedin: basicDetails?.linkedin || "",
      youtube: basicDetails?.youtube || "",
      instagram: basicDetails?.instagram || "",
    },
  });

  //   useEffect(() => {
  //     const savedBasicDetails = localStorage.getItem("basicDetails");
  //     if (savedBasicDetails) {
  //       const parsedDetails = JSON.parse(savedBasicDetails);
  //       reset(parsedDetails); // This sets the form values to the saved data
  //     }
  //   }, [reset]);

  const onSubmit: SubmitHandler<BasicCommunityDetailsSchema> = (data) => {
    setBasicDetails(data);
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    localStorage.setItem("currentStep", String(newStep));
    localStorage.setItem("basicDetails", JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:h-[640px] 2xl:h-[760px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              Community Details
            </p>
            <p className="text-sm leading-6">
              Basic information about the community.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 1/6</p> <p>0%</p>
            </div>
            <div className="py-1.5">
              <Progress value={0} className="w-full h-2" />
            </div>
          </div>
        </div>
        <div className="h-fit">
          <div className="overflow-scroll">
            <div className="flex flex-col md:flex-row gap-6 mt-2">
              <div className="bg-muted w-full md:w-[228px] h-fit rounded-xl flex flex-col justify-center items-center p-6 px-4">
                <div className="bg-background flex items-center justify-center mb-4 w-24 h-24 rounded-full p-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="image">
                      <path
                        id="Vector"
                        d="M14 10L11.9427 7.94267C11.6926 7.69271 11.3536 7.55229 11 7.55229C10.6464 7.55229 10.3074 7.69271 10.0573 7.94267L4 14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2ZM7.33333 6C7.33333 6.73638 6.73638 7.33333 6 7.33333C5.26362 7.33333 4.66667 6.73638 4.66667 6C4.66667 5.26362 5.26362 4.66667 6 4.66667C6.73638 4.66667 7.33333 5.26362 7.33333 6Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-border"
                      />
                    </g>
                  </svg>
                </div>
                <p className="text-sm leading-6 mb-2">
                  Edit your community logo
                </p>
                <Button className="px-8">Update</Button>
              </div>
              <div className="space-y-4 w-full md:w-[300px] pb-[10px]">
                <div className="space-y-2">
                  <Label htmlFor="title">Community Name</Label>
                  <Input
                    {...register("title")}
                    type="text"
                    placeholder="Community Name"
                    defaultValue={basicDetails?.title || ""}
                  />
                  {errors.title?.message && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.title?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Community Description</Label>
                  <Textarea
                    {...register("description")}
                    className="h-24"
                    placeholder="Community description"
                    defaultValue={basicDetails?.description || ""}
                  />
                  {errors.description?.message && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.description?.message}
                    </p>
                  )}
                </div>
                <p className="text-sm font-medium leading-[14px]">
                  Social Media links
                </p>

                <SelectInput />
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
            disabled
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
