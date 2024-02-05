"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/Progress";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import CommunityInfo from "../../[id]/_components/CommunityInfo";
import CommunityMembers from "../../[id]/_components/CommunityMembers";
import CommunityDetailsTopCards from "../../[id]/_components/CommunityDetailsTopCards";
import CarrotPotCard from "../../[id]/_components/CarrotPotCard";
import PeriodsCard from "../../[id]/_components/PeriodsCard";
import PriorityCards from "../../[id]/_components/PriorityCards";
import { Card } from "@/components/ui/card";
import { Search } from "@/components/Search";
import {
  AdminSettingsSchema,
  BasicCommunityDetailsSchema,
  CreateCommunitySchema,
  ProtocolConfigurationSchema,
  RewardSettingsSchema,
  createCommunitySchema,
} from "./createCommunitySchema";
import BasicDetailsForm from "./BasicDetailsForm";
import ProtocolConfigurationForm from "./ProtocolConfigurationForm";
import RewardsSettingsForm from "./RewardSettingsForm";
import UserRolesAndPermissionsForm from "./UserRolesAndPermissions";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import CarrotPotForm from "./CarrotPotForm";
import CreateCommunityStep from "./CreateCommunityStep";
import { FinalReviewForm } from "./FinalReviewForm";

export default function CreateCommunityForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const pathname = usePathname();
  // Load the current step from localStorage when the component mounts
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      localStorage.setItem("currentStep", String(savedStep));
      setCurrentStep(Number(savedStep));
    }
  }, []);

  useEffect(() => {
    // Function to clear localStorage items and reset currentStep
    const clearLocalStorage = () => {
      localStorage.removeItem("basicDetails");
      localStorage.removeItem("rewardSettings");
      localStorage.removeItem("protocolConfiguration");
      localStorage.removeItem("permissions");
      localStorage.setItem("currentStep", "0");
    };

    // Event listener to detect route changes
    const handleRouteChange = () => {
      clearLocalStorage();
    };

    // Add event listener on route change
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
  });

  const steps = [
    {
      id: 0,
      name: "Community Details",
      icon: (
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Lucide">
            <rect
              width="1334"
              height="1284"
              transform="translate(-1048 -976)"
            />
            <g id="settings">
              <g id="Vector">
                <path
                  d="M8.14667 1.33334H7.85333C7.49971 1.33334 7.16057 1.47382 6.91053 1.72387C6.66048 1.97392 6.52 2.31305 6.52 2.66668V2.78668C6.51976 3.02049 6.45804 3.25014 6.34103 3.45257C6.22401 3.655 6.05583 3.8231 5.85333 3.94001L5.56667 4.10668C5.36398 4.2237 5.13405 4.28531 4.9 4.28531C4.66595 4.28531 4.43603 4.2237 4.23333 4.10668L4.13333 4.05334C3.82738 3.87685 3.46389 3.82897 3.12267 3.92022C2.78145 4.01146 2.49037 4.23437 2.31333 4.54001L2.16667 4.79334C1.99018 5.0993 1.9423 5.46279 2.03354 5.80401C2.12478 6.14523 2.34769 6.43631 2.65333 6.61334L2.75333 6.68001C2.95485 6.79635 3.12241 6.9634 3.23937 7.16456C3.35632 7.36573 3.4186 7.59399 3.42 7.82668V8.16668C3.42093 8.40162 3.35977 8.63264 3.2427 8.83635C3.12563 9.04005 2.95681 9.2092 2.75333 9.32668L2.65333 9.38668C2.34769 9.56371 2.12478 9.85479 2.03354 10.196C1.9423 10.5372 1.99018 10.9007 2.16667 11.2067L2.31333 11.46C2.49037 11.7657 2.78145 11.9886 3.12267 12.0798C3.46389 12.171 3.82738 12.1232 4.13333 11.9467L4.23333 11.8933C4.43603 11.7763 4.66595 11.7147 4.9 11.7147C5.13405 11.7147 5.36398 11.7763 5.56667 11.8933L5.85333 12.06C6.05583 12.1769 6.22401 12.345 6.34103 12.5475C6.45804 12.7499 6.51976 12.9795 6.52 13.2133V13.3333C6.52 13.687 6.66048 14.0261 6.91053 14.2762C7.16057 14.5262 7.49971 14.6667 7.85333 14.6667H8.14667C8.50029 14.6667 8.83943 14.5262 9.08948 14.2762C9.33953 14.0261 9.48 13.687 9.48 13.3333V13.2133C9.48024 12.9795 9.54196 12.7499 9.65898 12.5475C9.77599 12.345 9.94418 12.1769 10.1467 12.06L10.4333 11.8933C10.636 11.7763 10.866 11.7147 11.1 11.7147C11.3341 11.7147 11.564 11.7763 11.7667 11.8933L11.8667 11.9467C12.1726 12.1232 12.5361 12.171 12.8773 12.0798C13.2186 11.9886 13.5096 11.7657 13.6867 11.46L13.8333 11.2C14.0098 10.8941 14.0577 10.5306 13.9665 10.1893C13.8752 9.84812 13.6523 9.55704 13.3467 9.38001L13.2467 9.32668C13.0432 9.2092 12.8744 9.04005 12.7573 8.83635C12.6402 8.63264 12.5791 8.40162 12.58 8.16668V7.83334C12.5791 7.5984 12.6402 7.36737 12.7573 7.16367C12.8744 6.95997 13.0432 6.79082 13.2467 6.67334L13.3467 6.61334C13.6523 6.43631 13.8752 6.14523 13.9665 5.80401C14.0577 5.46279 14.0098 5.0993 13.8333 4.79334L13.6867 4.54001C13.5096 4.23437 13.2186 4.01146 12.8773 3.92022C12.5361 3.82897 12.1726 3.87685 11.8667 4.05334L11.7667 4.10668C11.564 4.2237 11.3341 4.28531 11.1 4.28531C10.866 4.28531 10.636 4.2237 10.4333 4.10668L10.1467 3.94001C9.94418 3.8231 9.77599 3.655 9.65898 3.45257C9.54196 3.25014 9.48024 3.02049 9.48 2.78668V2.66668C9.48 2.31305 9.33953 1.97392 9.08948 1.72387C8.83943 1.47382 8.50029 1.33334 8.14667 1.33334Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10C9.10457 10 10 9.10458 10 8.00001C10 6.89544 9.10457 6.00001 8 6.00001C6.89543 6.00001 6 6.89544 6 8.00001C6 9.10458 6.89543 10 8 10Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: 1,
      name: "Protocol Configuration",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="list-checks">
            <path
              id="Vector"
              d="M6.66667 4H14M6.66667 8H14M6.66667 12H14M2 4L2.66667 4.66667L4 3.33333M2 8L2.66667 8.66667L4 7.33333M2 12L2.66667 12.6667L4 11.3333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      name: "Reward Settings",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="trophy" clipPath="url(#clip0_22_469)">
            <path
              id="Vector"
              d="M4 6.00001H3C2.55797 6.00001 2.13405 5.82442 1.82149 5.51185C1.50893 5.19929 1.33334 4.77537 1.33334 4.33334C1.33334 3.89132 1.50893 3.46739 1.82149 3.15483C2.13405 2.84227 2.55797 2.66668 3 2.66668H4M4 6.00001V1.33334H12V6.00001M4 6.00001C4 7.06088 4.42143 8.07829 5.17158 8.82844C5.92172 9.57858 6.93914 10 8 10C9.06087 10 10.0783 9.57858 10.8284 8.82844C11.5786 8.07829 12 7.06088 12 6.00001M12 6.00001H13C13.442 6.00001 13.866 5.82442 14.1785 5.51185C14.4911 5.19929 14.6667 4.77537 14.6667 4.33334C14.6667 3.89132 14.4911 3.46739 14.1785 3.15483C13.866 2.84227 13.442 2.66668 13 2.66668H12M2.66667 14.6667H13.3333M6.66667 9.77334V11.3333C6.66667 11.7 6.35334 11.9867 6.02 12.14C5.23334 12.5 4.66667 13.4933 4.66667 14.6667M9.33334 9.77334V11.3333C9.33334 11.7 9.64667 11.9867 9.98 12.14C10.7667 12.5 11.3333 13.4933 11.3333 14.6667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_22_469">
              <rect width="16" height="16" />
            </clipPath>
          </defs>
        </svg>
      ),
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
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="carrot">
            <path
              id="Vector"
              d="M5.76 9.33334L4.39334 7.97334M10.2267 10L8.58667 8.36001M10 6.00001C10 6.00001 11.24 4.66668 12.3333 4.66668C13.78 4.66668 14.6667 6.00001 14.6667 6.00001C14.6667 6.00001 13.78 7.33334 12.3333 7.33334C10.8867 7.33334 10 6.00001 10 6.00001ZM10 6.00001C10 6.00001 8.66667 5.11334 8.66667 3.66668C8.66667 2.22001 10 1.33334 10 1.33334C10 1.33334 11.3333 2.22001 11.3333 3.66668C11.3333 4.77334 10 6.00001 10 6.00001ZM1.51334 14.4667C1.51334 14.4667 8.09334 12.1333 10 10.2267C10.2788 9.94827 10.5001 9.61768 10.6512 9.25376C10.8023 8.88984 10.8802 8.49973 10.8805 8.1057C10.8808 7.71167 10.8035 7.32144 10.653 6.95728C10.5025 6.59313 10.2817 6.26218 10.0033 5.98334C9.72493 5.7045 9.39434 5.48323 9.03042 5.33215C8.6665 5.18108 8.27639 5.10316 7.88236 5.10285C7.48833 5.10254 7.0981 5.17985 6.73394 5.33035C6.36979 5.48085 6.03884 5.70161 5.76 5.98001C3.84667 7.89334 1.51334 14.4667 1.51334 14.4667Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
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
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="user">
            <path
              id="Vector"
              d="M12.6667 14V12.6667C12.6667 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 10 10H6C5.29275 10 4.61448 10.281 4.11438 10.781C3.61428 11.2811 3.33333 11.9594 3.33333 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47276 7.33333 8 7.33333C6.52724 7.33333 5.33333 6.13943 5.33333 4.66667C5.33333 3.19391 6.52724 2 8 2C9.47276 2 10.6667 3.19391 10.6667 4.66667Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 5,
      name: "Final Review",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.66666 8H13.3333M2.66666 4H13.3333M2.66666 12H13.3333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const [basicDetails, setBasicDetails] =
    useState<BasicCommunityDetailsSchema>();

  const [protocolConfiguration, setProtocolConfiguration] =
    useState<ProtocolConfigurationSchema>();

  const [rewardSettings, setRewardsSettings] = useState<RewardSettingsSchema>();

  const [permissions, setPermissions] = useState<AdminSettingsSchema>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localBasicDetails = localStorage.getItem("basicDetails");
      const parsedLocalBasicDetails = localBasicDetails
        ? JSON.parse(localBasicDetails)
        : {};
      setBasicDetails(parsedLocalBasicDetails);

      const localProtocolConfiguration = localStorage.getItem(
        "protocolConfiguration"
      );
      const parsedLocalProtocolConfiguration = localProtocolConfiguration
        ? JSON.parse(localProtocolConfiguration)
        : {};
      setProtocolConfiguration(parsedLocalProtocolConfiguration);

      const localRewardSettings = localStorage.getItem("rewardSettings");
      const parsedLocalRewardSettings = localRewardSettings
        ? JSON.parse(localRewardSettings)
        : {};
      setRewardsSettings(parsedLocalRewardSettings);

      const localPermissions = localStorage.getItem("permissions");
      const parsedLocalPermissions = localPermissions
        ? JSON.parse(localPermissions)
        : {};
      setPermissions(parsedLocalPermissions);
    }
  }, []);
  const onSubmit: SubmitHandler<CreateCommunitySchema> = (data) => {
    const publicData = {
      ...rewardSettings,
      ...protocolConfiguration,
      ...basicDetails,
      ...data,
    };

    const privateData = {
      ...permissions,
    };
    console.log(publicData, privateData);
  };

  // const [step1Response, set] = useState<Step1FromSchema | undefined>(undefined);
  const prev = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep((step) => step - 1);
      localStorage.setItem("currentStep", String(newStep));
    }
  };
  // const { mutate, isLoading } = useToastMutation(
  //   async ({
  //     communityTitle,
  //     proposalAbsoluteReward,
  //   }: {
  //     communityTitle: string;
  //     proposalAbsoluteReward: number;
  //   }) => {
  //     return await createOrganization({
  //       name: communityTitle,
  //       proposalAbsoluteReward,
  //     });
  //   },
  //   {
  //     loadingMessage: "Creating community...",
  //     errorMessage: "Failed to create community",
  //     successMessage: "Community created!",
  //     onSuccess: (community) => {
  //       const communityId = community.id;
  //       router.push(`/communities/${communityId}`);
  //     },
  //   }
  // );

  // const onConfirm = ({
  //   communityTitle,
  //   proposalAbsoluteReward,
  // }: {
  //   communityTitle: string;
  //   proposalAbsoluteReward: number;
  // }) => {
  //   mutate({ communityTitle, proposalAbsoluteReward });
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onConfirm({
  //     communityTitle,
  //     proposalAbsoluteReward: proposalAbsoluteReward,
  //   });
  // };

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
          {steps.map((step) => {
            return (
              <CreateCommunityStep
                step={step}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                key={step.id}
              />
            );
          })}
        </div>
        <div className="w-full">
          <div className="w-full">
            {currentStep === 0 && (
              <BasicDetailsForm
                basicDetails={basicDetails}
                setBasicDetails={setBasicDetails}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 1 && (
              <ProtocolConfigurationForm
                protocolConfiguration={protocolConfiguration}
                setProtocolConfiguration={setProtocolConfiguration}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 2 && (
              <RewardsSettingsForm
                rewardSettings={rewardSettings}
                setRewardsSettings={setRewardsSettings}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 3 && (
              <CarrotPotForm
                rewardSettings={rewardSettings}
                setRewardsSettings={setRewardsSettings}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 4 && (
              <UserRolesAndPermissionsForm
                permissions={permissions}
                setPermissions={setPermissions}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 5 && (
              // <form
              //   onSubmit={handleSubmit(onSubmit)}
              //   data-tid="create-community-form"
              //   className="w-full"
              // >
              //   <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
              //     <div className="flex justify-between items-center pb-4 border-b">
              //       <div className="flex flex-col w-full">
              //         <p className="font-semibold text-foreground text-base leading-9">
              //           Final Review
              //         </p>
              //         <p className="text-sm leading-6">
              //           Assign roles and define permissions within the
              //           community.
              //         </p>
              //       </div>
              //       <div className="flex flex-col">
              //         <div className="flex justify-between text-sm text-muted-foreground">
              //           <p>Step 6/6</p> <p>100%</p>
              //         </div>
              //         <div className="py-1.5">
              //           <Progress value={100} className="h-2 w-[160px]" />
              //         </div>
              //       </div>
              //     </div>

              //     <div className="grid grid-cols-[auto,1fr] gap-4 h-[calc(100vh-400px)]   md:h-[calc(100vh-600px)] xl:h-[calc(100vh-220px)] overflow-hidden w-full ">
              //       {/* Members */}
              //       <div className="flex flex-col gap-4 rounded-lg w-[280px]">
              //         <CommunityInfo
              //           communityName={basicDetails?.title || "Community name"}
              //           communityUrls={{
              //             website: basicDetails?.website || "",
              //             facebook: basicDetails?.facebook || "",
              //             twitter: basicDetails?.twitter || "",
              //             linkedin: basicDetails?.linkedin || "",
              //             youtube: basicDetails?.youtube || "",
              //           }}
              //         />
              //         <div className="h-20 md:h-20 xl:h-72 rounded-xl overflow-auto">
              //           <CommunityMembers />
              //         </div>
              //       </div>
              //       {/* Details */}
              //       <div className="h-full overflow-y-auto w-full">
              //         <div className="flex flex-col gap-4 w-full">
              //           <CommunityDetailsTopCards
              //           //  rewards={rewardSettings}
              //           />
              //           <div className="grid grid-cols-4 gap-4 w-full">
              //             <CarrotPotCard />
              //             <PeriodsCard
              //             // periods={{
              //             //   prioritizationPeriod:
              //             //     protocolConfiguration?.prioritizationPeriod ||
              //             //     0,
              //             //   contributionPeriod:
              //             //     protocolConfiguration?.contributionPeriod || 0,
              //             //   validationPeriod:
              //             //     protocolConfiguration?.validationPeriod || 0,
              //             // }}
              //             />
              //             <PriorityCards />
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              //   <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
              //     <div className="mx-auto flex gap-2 justify-start">
              //       <Button
              //         variant="outline"
              //         className="w-[100px]"
              //         onClick={() => {
              //           prev();
              //         }}
              //         type="button"
              //       >
              //         Back
              //       </Button>{" "}
              //       <Button variant="default" type="submit" className="w-full">
              //         Create Community
              //       </Button>
              //     </div>
              //   </div>
              // </form>
              <FinalReviewForm
                basicDetails={basicDetails}
                rewardSettings={rewardSettings}
                protocolConfiguration={protocolConfiguration}
                prev={prev}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
