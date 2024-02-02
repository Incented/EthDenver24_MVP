"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import AdminSettingsStep from "./AdminSettingsStep";
import MemberManagement from "./MemberManagement";
import CommunityDetails from "./CommunityDetails";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdimSettingsProps {}

const AdimSettings: FC<AdimSettingsProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      id: 1,
      name: "Community Details",
    },
    {
      id: 2,
      name: "Reward Settings",

      feilds: [
        "proposalReward",
        "prioritizationReward",
        "validationReward",
        "claimStakeAmount",
      ],
    },
    {
      id: 3,
      name: "Configure Carrot Pot",

      feilds: [
        "proposalReward",
        "prioritizationReward",
        "validationReward",
        "claimStakeAmount",
      ],
    },
    {
      id: 4,
      name: "User Roles & Permissions",
    },
    {
      id: 5,
      name: "Member Management",
    },
  ];

  return (
    <div className="w-full px-6 pt-0">
      <div className="relative md:grid md:grid-cols-[auto,1fr] flex flex-col gap-4 w-full h-full">
        <div className="relative flex rounded-lg md:flex-col flex-row gap-6 p-6 md:w-[280px] w-full overflow-y-hidden md:overflow-x-hidden bg-secondary h-fit md:h-fit">
          <div
            className={cn(
              "h-44",
              "absolute left-8 z-0 top-10 flex w-6 justify-center"
            )}
          >
            <div className="hidden md:block w-px bg-border h-[240px]" />
          </div>
          <hr className="absolute block md:hidden left-12 top-1/2 z-0 w-[400px] border-t border-border" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Community" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Communities</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {steps.map((step) => {
            return (
              <AdminSettingsStep
                step={step}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                key={step.id}
              />
            );
          })}
        </div>
        <div className="w-full">
          {currentStep === 0 && (
            <div>
              <h1>Choose Community</h1>
            </div>
          )}
          {currentStep === 1 ? <CommunityDetails /> : null}
          {currentStep === 2 && (
            <div>
              <h1>Reward Settings</h1>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h1>Configure Carrot Pot</h1>
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <h1>User Roles & Permissions</h1>
            </div>
          )}
          {currentStep === 5 ? <MemberManagement /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdimSettings;
