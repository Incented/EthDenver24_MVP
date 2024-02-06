"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectInput from "@/components/ui/SelectInput/SelectInput";
import { Plus } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BasicCommunityDetailsSchema,
  basicCommunityDetailsSchema,
} from "../../communities/create-community/_components/createCommunitySchema";

interface CommunityDetailsProps {}

const CommunityDetails: FC<CommunityDetailsProps> = ({}) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<BasicCommunityDetailsSchema>({
    resolver: zodResolver(basicCommunityDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      socialLinks: [{ type: undefined, url: "" }],
    },
  });

  const onSubmit: SubmitHandler<BasicCommunityDetailsSchema> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-lg rounded-b-none">
          <div className="flex flex-col items-center justify-between w-full border-b sm:flex-row">
            <div className="flex flex-col w-full pb-4 lg:col-span-2">
              <p className="text-base font-semibold leading-9 text-foreground">
                Community Details
              </p>
              <p className="text-sm leading-6">
                Basic information about the community.
              </p>
            </div>
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
          <div className="h-fit">
            <div className="overflow-scroll">
              <div className="flex flex-col gap-6 mt-2 lg:flex-row">
                <div className="bg-muted w-full md:w-[228px] h-fit rounded-xl flex flex-col justify-center items-center p-6 px-4">
                  <div className="flex items-center justify-center w-24 h-24 p-4 mb-4 rounded-full bg-background">
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
                  <p className="mb-2 text-sm leading-6">
                    Edit your community logo
                  </p>
                  <Button className="px-8">Update</Button>
                </div>
                <div className="space-y-4 w-full md:w-[300px] pb-[10px]">
                  <div className="space-y-2">
                    <Label htmlFor="title">Community Name</Label>
                    <Input
                      type="text"
                      placeholder="Community Name"
                      defaultValue={""}
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
                      className="h-24"
                      placeholder="Community description"
                      defaultValue={""}
                    />
                    {errors.description?.message && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <p className="text-sm font-medium leading-[14px] mb-4">
                      Social Media links
                    </p>

                    <SelectInput />
                    <Button
                      variant="ghost"
                      className="mt-4 text-sm text-primary "
                    >
                      <Plus />
                      <p>Add Link</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommunityDetails;
