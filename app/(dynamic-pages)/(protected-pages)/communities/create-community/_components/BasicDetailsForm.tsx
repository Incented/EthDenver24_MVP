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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:h-[640px] 2xl:h-[760px]">
        <div className="flex justify-between items-center pb-4 border-b">
          <div className="flex flex-col w-full">
            <p className="font-semibold text-foreground text-base leading-9">
              Community Details
            </p>
            <p className="text-sm leading-6">
              Basic information about the community.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 1/6</p> <p>0%</p>
            </div>
            <div className="py-1.5">
              <Progress value={0} className="h-2 w-[160px]" />
            </div>
          </div>
        </div>
        <div className="h-[484px] overflow-x-hidden">
          <div className="grid grid-cols-[auto,1fr] gap-6 mt-2 h-fit">
            <div className="bg-muted w-[228px] h-fit rounded-xl flex flex-col justify-center items-center p-6 px-4">
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
              <p className="text-sm leading-6 mb-2">Edit your community logo</p>
              <Button className="px-8">Update</Button>
            </div>
            <div className="space-y-4 w-[300px] pb-[10px]">
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
              {/* website */}
              <div className="relative space-y-2">
                <Input
                  {...register("website")}
                  className=" pl-8"
                  placeholder="website_url"
                  defaultValue={basicDetails?.website || ""}
                />
                {errors.website?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.website?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="link">
                      <path
                        id="Vector"
                        d="M6.66668 8.66667C6.95298 9.04942 7.31825 9.36612 7.73771 9.59529C8.15717 9.82446 8.62102 9.96074 9.09778 9.99489C9.57454 10.029 10.0531 9.96024 10.5009 9.79319C10.9487 9.62613 11.3554 9.36471 11.6933 9.02667L13.6933 7.02667C14.3005 6.39799 14.6365 5.55598 14.6289 4.682C14.6213 3.80801 14.2708 2.97196 13.6527 2.35394C13.0347 1.73591 12.1987 1.38535 11.3247 1.37775C10.4507 1.37016 9.60869 1.70614 8.98001 2.31333L7.83334 3.45333M9.33334 7.33333C9.04704 6.95058 8.68177 6.63388 8.26231 6.40471C7.84285 6.17553 7.37901 6.03926 6.90224 6.00511C6.42548 5.97097 5.94695 6.03975 5.49911 6.20681C5.05128 6.37387 4.6446 6.63529 4.30668 6.97333L2.30668 8.97333C1.69948 9.60201 1.3635 10.444 1.3711 11.318C1.37869 12.192 1.72926 13.028 2.34728 13.6461C2.96531 14.2641 3.80135 14.6147 4.67534 14.6222C5.54933 14.6298 6.39134 14.2939 7.02001 13.6867L8.16001 12.5467"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=" stroke-foreground"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {/* facebook */}
              <div className="relative space-y-2">
                <Input
                  {...register("facebook")}
                  className=" pl-8"
                  placeholder="facebook_url"
                  defaultValue={basicDetails?.website || ""}
                />
                {errors.facebook?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.facebook?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <Facebook
                    size={16}
                    className=" text-border-foreground bg-transparent rounded-md"
                  />
                </div>
              </div>

              {/* twitter */}
              <div className="relative space-y-2">
                <Input
                  {...register("twitter")}
                  className=" pl-8"
                  placeholder="twitter_url"
                />
                {errors.twitter?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.twitter?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <svg
                    width="1200px"
                    height="1200px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground rounded-md"
                  >
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                  </svg>
                </div>
              </div>

              {/* linkedin */}
              <div className="relative space-y-2">
                <Input
                  {...register("linkedin")}
                  className="pl-8"
                  placeholder="linkedin_url"
                />
                {errors.linkedin?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.linkedin?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <Facebook
                    size={16}
                    className=" text-border-foreground bg-transparent rounded-md"
                  />
                </div>
              </div>

              {/* youtube */}
              <div className="relative space-y-2">
                <Input
                  {...register("youtube")}
                  className=" pl-8"
                  placeholder="youtube_url"
                />
                {errors.youtube?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.youtube?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <Facebook
                    size={16}
                    className=" text-border-foreground bg-transparent rounded-md"
                  />
                </div>
              </div>

              {/* instagram */}
              <div className="relative space-y-2">
                <Input
                  {...register("instagram")}
                  className=" pl-8"
                  placeholder="instagram_url"
                />

                {errors.instagram?.message && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.instagram?.message}
                  </p>
                )}
                <div className="absolute left-2.5 -top-1 translate-y-1/2">
                  <Facebook
                    size={16}
                    className=" text-border-foreground bg-transparent rounded-md"
                  />
                </div>
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
