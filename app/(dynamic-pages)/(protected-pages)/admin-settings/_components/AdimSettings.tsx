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
import RewardSettingsForm from "../../communities/create-community/_components/RewardSettingsForm";

import CarrotPotForm from "../../communities/create-community/_components/CarrotPotForm";

import ProtocolConfigurationForm from "../../communities/create-community/_components/ProtocolConfigurationForm";
import {
  AdminSettingsSchema,
  CarrotPotSchema,
  ProtocolConfigurationSchema,
  RewardSettingsSchema,
} from "../../communities/create-community/_components/createCommunitySchema";
import UserRolesAndPermissionsForm from "../../communities/create-community/_components/UserRolesAndPermissions";

interface AdimSettingsProps {}

const AdimSettings: FC<AdimSettingsProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    {
      id: 1,
      name: "Community Details",
    },
    {
      id: 2,
      name: "Protocol Configuration",
    },
    {
      id: 3,
      name: "Reward Settings",

      feilds: [
        "proposalReward",
        "prioritizationReward",
        "validationReward",
        "claimStakeAmount",
      ],
    },
    {
      id: 4,
      name: "Configure Carrot Pot",

      feilds: [
        "proposalReward",
        "prioritizationReward",
        "validationReward",
        "claimStakeAmount",
      ],
    },
    {
      id: 5,
      name: "User Roles & Permissions",
    },
    {
      id: 6,
      name: "Member Management",
    },
  ];

  const [protocolConfiguration, setProtocolConfiguration] =
    useState<ProtocolConfigurationSchema>({
      contributionPeriod: 0,
      prioritizationPeriod: 0,
      validationPeriod: 0,
      validationQuorum: 0,
      prioritizationQourum: 0,
    });
  const [rewardSettings, setRewardsSettings] = useState<RewardSettingsSchema>({
    prioritizationReward: 0,
    validationReward: 0,
    proposalReward: 0,
    claimStakeAmount: 100,
  });

  const [permissions, setPermissions] = useState<AdminSettingsSchema>({
    addOrRemoveMembers: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    adjustPersonalSettings: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    approveMembersJoinRequest: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    approveTaskProposal: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    assignInitialMemberRolesAndPermissions: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    changeProtocolSettings: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    communitySpecificSettings: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    contributeToTasks: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    inviteOtherUsers: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    manageTaskSettings: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    overseeCarrotDistribution: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    participateInTaskValidation: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    postOnTaskDiscussion: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    proposeNewTasks: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    reviewCommunityPerformance: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    takesCarrotsToPrioritizeTasks: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    trackRewards: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    vetoInappropriateTasks: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
    viewOngoingTasks: {
      isValidForMembers: false,
      isValidForAdmin: false,
      isValidForVetoPower: false,
    },
  });

  const [carrotPotSettings, setCarrotPotSettings] = useState<CarrotPotSchema>({
    community_live_status: "live",
    community_token: "carrot",
  });

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
          {currentStep === 1 ? <CommunityDetails /> : null}
          {currentStep === 2 ? (
            <ProtocolConfigurationForm
              initialFormValues={protocolConfiguration}
              onFormSubmit={(formData: ProtocolConfigurationSchema): void => {
                // Perform state update with formData
                setProtocolConfiguration(formData);
              }}
              withStep={false}
            />
          ) : null}
          {currentStep === 3 ? (
            <RewardSettingsForm
              initialFormValues={rewardSettings}
              onFormSubmit={(formData: RewardSettingsSchema): void => {
                setRewardsSettings(formData);
              }}
            />
          ) : null}
          {currentStep === 4 ? (
            <CarrotPotForm
              initialFormValues={carrotPotSettings}
              onFormSubmit={(formData: CarrotPotSchema): void => {
                setCarrotPotSettings(formData);
              }}
            />
          ) : null}
          {currentStep === 5 ? (
            <UserRolesAndPermissionsForm
              initialFormValues={permissions}
              onFormSubmit={(formData: AdminSettingsSchema): void => {
                setPermissions(formData);
              }}
            />
          ) : null}
          {currentStep === 6 ? <MemberManagement /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdimSettings;
