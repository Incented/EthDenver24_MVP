"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "@/data/user/organizations";
import { useToastMutation } from "@/hooks/useToastMutation";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/Switch";
import {
  MinusIcon,
  Facebook,
  PlusIcon,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CommunityInfo from "../../[id]/_components/CommunityInfo";
import CommunityMembers from "../../[id]/_components/CommunityMembers";
import CommunityDetailsTopCards from "../../[id]/_components/CommunityDetailsTopCards";
import CarrotPotCard from "../../[id]/_components/CarrotPotCard";
import PeriodsCard from "../../[id]/_components/PeriodsCard";
import PriorityCards from "../../[id]/_components/PriorityCards";
import { Card } from "@/components/ui/card";
import { Search } from "@/components/Search";

// type Inputs = z.infer<typeof CreateCommunityFormSchema>;

const protocolAccordionItems = [
  {
    title: "Prioritization Quorum",
    content: `A community can set this value that needs to be reached before a task can be claimed or contributed to. E.g. a proposal needs to have a >75% positive priority.`,
    isOpen: true,
  },
  {
    title: "Validation Quorum",
    content: `This is the minimum number of validations required for a task to be considered completed. It ensures that tasks are not marked as completed without sufficient review.`,
    isOpen: false,
  },
  {
    title: "Prioritization Period",
    content: `This is the time frame within which community members can prioritize tasks. It ensures that all tasks get a fair chance of being reviewed and prioritized.`,
    isOpen: false,
  },
  {
    title: "Contribution Period",
    content: `This is the time frame within which community members can contribute to tasks. It ensures that tasks are not left incomplete for long periods of time.`,
    isOpen: false,
  },
  {
    title: "Validation Period",
    content: `This is the time frame within which community members can validate completed tasks. It ensures that tasks are reviewed and validated in a timely manner.`,
    isOpen: false,
  },
];
const rewardAccordionItems = [
  {
    title: "Proposal Reward",
    content: `A community can set this value that needs to be reached before a task can be claimed or contributed to. E.g. a proposal needs to have a >75% positive priority.`,
    isOpen: true,
  },
  {
    title: "Prioritization Reward",
    content: `This is the minimum number of validations required for a task to be considered completed. It ensures that tasks are not marked as completed without sufficient review.`,
    isOpen: false,
  },
  {
    title: "Validation Reward",
    content: `This is the time frame within which community members can prioritize tasks. It ensures that all tasks get a fair chance of being reviewed and prioritized.`,
    isOpen: false,
  },
  {
    title: "Claim-Stake-Amount",
    content: `This is the time frame within which community members can contribute to tasks. It ensures that tasks are not left incomplete for long periods of time.`,
    isOpen: false,
  },
];

const rolesAndPermissions = [
  {
    title: "Set up community-specific settings.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Invite other users.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Approve member's join request.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Approve a task proposal.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Assign initial member roles and permissions.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Add/remove members.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Manage task settings.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title:
      "Oversee carrot distribution, manage carrot-pot, and adjust reward settings.",
    isValidForAdmin: true,
    isValidForMembers: false,
    isValidForVetoPower: false,
  },
  {
    title: "Veto inappropriate tasks.",
    isValidForAdmin: false,
    isValidForMembers: false,
    isValidForVetoPower: true,
  },
  {
    title: "View ongoing tasks.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title:
      "Review community performance, member engagement, and task success rates.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Post on Task Discussion.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Takes carrots to prioritize tasks.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Propose new tasks.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Contribute to tasks.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Participate in validation.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Track rewards and performance.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
  {
    title: "Adjust personal settings and preferences.",
    isValidForAdmin: true,
    isValidForMembers: true,
    isValidForVetoPower: false,
  },
];

const AccordionComponent = ({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: (event: React.MouseEvent) => void;
}) => (
  <details open={isOpen} className="space-y-2" onClick={onToggle}>
    <summary className="flex justify-between border-b">
      <span className="text-base leading-9 font-medium">{title}</span>
      <div className="flex items-center justify-end pr-1 h-9">
        {isOpen ? (
          <MinusIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </div>
    </summary>
    <p className="text-sm leading-6 font-light text-muted-foreground">
      {content}
    </p>
  </details>
);

const AccordionList = ({
  accordionItems,
}: {
  accordionItems: {
    title: string;
    content: string;
    isOpen: boolean;
  }[];
}) => {
  const [openIndex, setOpenIndex] = useState(-1); // Set default state to -1 so no item is open by default

  const handleToggle = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default behavior of the details element
    setOpenIndex(openIndex !== index ? index : -1); // Toggle the open state by checking if the clicked index is not the current openIndex
  };

  return (
    <div className="flex-1 space-y-4 bg-muted h-full p-6 rounded-lg">
      {accordionItems.map((item, index) => (
        <AccordionComponent
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default function CreateCommunityForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  // Load the current step from localStorage when the component mounts
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      setCurrentStep(Number(savedStep));
    }
  }, []);

  const next = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep((step) => step + 1);
      localStorage.setItem("currentStep", String(newStep));
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep((step) => step - 1);
      localStorage.setItem("currentStep", String(newStep));
    }
  };

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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 10C9.10457 10 10 9.10458 10 8.00001C10 6.89544 9.10457 6.00001 8 6.00001C6.89543 6.00001 6 6.89544 6 8.00001C6 9.10458 6.89543 10 8 10Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              stroke-linecap="round"
              stroke-linejoin="round"
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
          <g id="carrot">
            <path
              id="Vector"
              d="M5.76 9.33334L4.39334 7.97334M10.2267 10L8.58667 8.36001M10 6.00001C10 6.00001 11.24 4.66668 12.3333 4.66668C13.78 4.66668 14.6667 6.00001 14.6667 6.00001C14.6667 6.00001 13.78 7.33334 12.3333 7.33334C10.8867 7.33334 10 6.00001 10 6.00001ZM10 6.00001C10 6.00001 8.66667 5.11334 8.66667 3.66668C8.66667 2.22001 10 1.33334 10 1.33334C10 1.33334 11.3333 2.22001 11.3333 3.66668C11.3333 4.77334 10 6.00001 10 6.00001ZM1.51334 14.4667C1.51334 14.4667 8.09334 12.1333 10 10.2267C10.2788 9.94827 10.5001 9.61768 10.6512 9.25376C10.8023 8.88984 10.8802 8.49973 10.8805 8.1057C10.8808 7.71167 10.8035 7.32144 10.653 6.95728C10.5025 6.59313 10.2817 6.26218 10.0033 5.98334C9.72493 5.7045 9.39434 5.48323 9.03042 5.33215C8.6665 5.18108 8.27639 5.10316 7.88236 5.10285C7.48833 5.10254 7.0981 5.17985 6.73394 5.33035C6.36979 5.48085 6.03884 5.70161 5.76 5.98001C3.84667 7.89334 1.51334 14.4667 1.51334 14.4667Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 3,
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
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 4,
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
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  const [communityTitle, setCommunityTitle] = useState("");
  const [proposalAbsoluteReward, setProposalAbsoluteReward] = useState(0);
  const { mutate, isLoading } = useToastMutation(
    async ({
      communityTitle,
      proposalAbsoluteReward,
    }: {
      communityTitle: string;
      proposalAbsoluteReward: number;
    }) => {
      return await createOrganization({
        name: communityTitle,
        proposalAbsoluteReward,
      });
    },
    {
      loadingMessage: "Creating community...",
      errorMessage: "Failed to create community",
      successMessage: "Community created!",
      onSuccess: (community) => {
        const communityId = community.id;
        router.push(`/communities/${communityId}`);
      },
    }
  );

  const onConfirm = ({
    communityTitle,
    proposalAbsoluteReward,
  }: {
    communityTitle: string;
    proposalAbsoluteReward: number;
  }) => {
    mutate({ communityTitle, proposalAbsoluteReward });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({
      communityTitle,
      proposalAbsoluteReward: proposalAbsoluteReward,
    });
  };

  return (
    <div className="px-8 pt-0 w-full h-full md:overflow-y-hidden">
      <div className="relative md:grid md:grid-cols-[auto,1fr] flex flex-col gap-4 w-full h-full">
        <div className="relative flex rounded-lg md:flex-col flex-row gap-6 p-6 md:w-[280px] w-full overflow-y-hidden md:overflow-x-hidden bg-secondary h-fit md:h-fit">
          <div
            className={cn(
              "h-40",
              "absolute left-8 z-0 top-10 flex w-6 justify-center"
            )}
          >
            <div className="w-px bg-border h-[240px]" />
          </div>
          {steps.map((step) => {
            return (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "relative w-full text-base leading-9 whitespace-nowrap px-0 bg-transparent shadow-none ",
                  currentStep === step.id
                    ? "text-foreground font-medium "
                    : "text-muted-foreground font-normal hover:text-foreground"
                )}
              >
                <div className="flex gap-2 items-center">
                  {step.icon ? (
                    <div
                      className={cn(
                        "border rounded-full h-10 w-10 bg-background flex items-center justify-center",
                        currentStep === step.id
                          ? "bg-primary stroke-background"
                          : "bg-background stroke-foreground"
                      )}
                    >
                      {step.icon}
                    </div>
                  ) : null}
                  <span className="leading-9">{step.name}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            data-testid="create-community-form"
            className="w-full"
          >
            <div className="w-full">
              {currentStep === 0 && (
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
                        <p>Step 1/5</p> <p>20%</p>
                      </div>
                      <div className="py-1.5">
                        <Progress value={20} className="h-2 w-[160px]" />
                      </div>
                    </div>
                  </div>

                  <div className=" h-[484px] overflow-hidden">
                    <div className="flex gap-6 mt-2 overflow-auto ">
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="stroke-border"
                              />
                            </g>
                          </svg>
                        </div>
                        <p className="text-sm leading-6 mb-2">
                          {" "}
                          Edit your community logo
                        </p>
                        <Button className="px-8">Update</Button>
                      </div>
                      <div className="space-y-4 w-[300px] pb-[10px]">
                        <div className="space-y-2">
                          <Label htmlFor="name">Community Name</Label>
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Community Name"
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Community Description</Label>
                          <Textarea
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            className="h-24"
                            required
                            id="name"
                            name="name"
                            placeholder="Community Description"
                            disabled={isLoading}
                          />
                        </div>
                        {/* <div className="flex gap-3 items-center mb-2">
                          <Switch />{" "}
                          <p className="text-sm font-normal leading-5">
                            Allow Members to invite other members
                          </p>
                        </div>{" "} */}
                        <p className="text-sm font-medium leading-[14px]">
                          Social Media links
                        </p>
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="websitelink.com"
                            disabled={isLoading}
                          />
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
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className=" stroke-foreground"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="facebook_username.com"
                            disabled={isLoading}
                          />
                          <div className="absolute left-2.5 -top-1 translate-y-1/2">
                            <Facebook
                              size={16}
                              className=" text-border-foreground bg-transparent rounded-md"
                            />
                          </div>
                        </div>
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="twitter_username.com"
                            disabled={isLoading}
                          />
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
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="linkedin_username.com"
                            disabled={isLoading}
                          />
                          <div className="absolute left-2.5 -top-1 translate-y-1/2">
                            <Facebook
                              size={16}
                              className=" text-border-foreground bg-transparent rounded-md"
                            />
                          </div>
                        </div>
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="instagram_username.com"
                            disabled={isLoading}
                          />
                          <div className="absolute left-2.5 -top-1 translate-y-1/2">
                            <Facebook
                              size={16}
                              className=" text-border-foreground bg-transparent rounded-md"
                            />
                          </div>
                        </div>
                        <div className="relative space-y-2">
                          <Input
                            value={communityTitle}
                            onChange={(event) =>
                              setCommunityTitle(event.target.value)
                            }
                            required
                            className=" pl-8"
                            id="name"
                            name="name"
                            placeholder="youtube_username.com"
                            disabled={isLoading}
                          />
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
              )}
              {currentStep === 1 && (
                <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-foreground text-base leading-9">
                        Protocol Configuration
                      </p>
                      <p className="text-sm leading-6">
                        Manage your community parameters such as protocol fees,
                        carrot-pot, validation quorum, etc.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Step 2/5</p> <p>40%</p>
                      </div>
                      <div className="py-1.5">
                        <Progress value={40} className="h-2 w-[160px]" />
                      </div>
                    </div>
                  </div>

                  <div className=" h-[484px] overflow-hidden ">
                    <div className="flex gap-8">
                      <div className="flex-1 space-y-6">
                        <div>
                          <h3 className="text-base leading-9 font-normal">
                            Quorum
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative space-y-1">
                              <span className="text-sm">
                                Prioritization Quorum
                              </span>
                              <Input placeholder="0" className="pl-6" />

                              <p className="mt-0 absolute left-3 top-1/2 text-muted-foreground">{`>`}</p>
                            </div>
                            <div className="relative space-y-1">
                              <span className="text-sm">Validation Quorum</span>
                              <Input placeholder="0" className="pl-6" />
                              <p className="mt-0 absolute left-3 top-1/2 text-muted-foreground">{`>`}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base leading-9 font-normal">
                            Periods
                          </h3>
                          <div className="mt-2 grid grid-cols-3 gap-4">
                            <div className="relative space-y-1">
                              <span className="text-sm">
                                Prioritization Period
                              </span>
                              <Input placeholder="0" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                days
                              </p>
                            </div>
                            <div className="relative space-y-1">
                              <span className="text-sm">
                                Contribution Period
                              </span>
                              <Input placeholder="0" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                days
                              </p>
                            </div>
                            <div className="relative space-y-1">
                              <span className="text-sm">Validation Period</span>
                              <Input placeholder="0" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                days
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AccordionList accordionItems={protocolAccordionItems} />
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-foreground text-base leading-9">
                        Reward Settings
                      </p>
                      <p className="text-sm leading-6">
                        Manage the task reward for your community members.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Step 3/5</p> <p>60%</p>
                      </div>
                      <div className="py-1.5">
                        <Progress value={60} className="h-2 w-[160px]" />
                      </div>
                    </div>
                  </div>

                  <div className="h-full overflow-hidden">
                    <div className="h-full flex gap-8">
                      <div className="flex-1 space-y-6">
                        <div>
                          <div className="mt-2 grid grid-cols-2 gap-4 max-w-md">
                            <div className="relative w-40 space-y-1">
                              <span className="text-sm">Proposal Reward</span>
                              <Input placeholder="0" className=" pr-2" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                %
                              </p>
                            </div>
                            <div className="relative w-40 space-y-1">
                              <span className="text-sm">
                                Prioritization Reward
                              </span>
                              <Input placeholder="0" className=" pr-2" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                %
                              </p>
                            </div>
                            <div className="relative w-40 space-y-1">
                              <span className="text-sm">Validation Reward</span>
                              <Input placeholder="0" className=" pr-2" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                %
                              </p>
                            </div>
                            <div className="relative w-40 space-y-1">
                              <span className="text-sm">
                                Claim Stake Amount
                              </span>
                              <Input placeholder="0" className=" pr-2" />
                              <p className="absolute right-2 top-1/2 text-sm text-muted-foreground">
                                %
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AccordionList accordionItems={rewardAccordionItems} />
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-foreground text-base leading-9">
                        User Roles and Permissions
                      </p>
                      <p className="text-sm leading-6">
                        Assign roles and define permissions within the
                        community.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Step 4/5</p> <p>80%</p>
                      </div>
                      <div className="py-1.5">
                        <Progress value={80} className="h-2 w-[160px]" />
                      </div>
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-5 gap-4"> */}
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="border-none">
                        <TableHead className="pl-0">Title</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Veto Power</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rolesAndPermissions.map((item, index) => (
                        <TableRow key={index} className="border-0">
                          <TableCell className="pl-0 text-sm leading-[14px]">
                            {item.title}
                          </TableCell>
                          <TableCell>
                            <Switch defaultChecked={item.isValidForAdmin} />
                          </TableCell>
                          <TableCell>
                            <Switch defaultChecked={item.isValidForMembers} />
                          </TableCell>
                          <TableCell>
                            <Switch defaultChecked={item.isValidForVetoPower} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              {currentStep === 4 && (
                <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-foreground text-base leading-9">
                        Final Review
                      </p>
                      <p className="text-sm leading-6">
                        Assign roles and define permissions within the
                        community.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Step 5/5</p> <p>100%</p>
                      </div>
                      <div className="py-1.5">
                        <Progress value={100} className="h-2 w-[160px]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[auto,1fr] gap-4 h-[calc(100vh-400px)]   md:h-[calc(100vh-600px)] xl:h-[calc(100vh-220px)] overflow-hidden w-full ">
                    {/* Members */}
                    <div className="flex flex-col gap-4 rounded-lg w-[280px]">
                      <CommunityInfo communityName={communityTitle} />
                      <div className="h-20 md:h-20 xl:h-72 rounded-xl overflow-auto">
                        <CommunityMembers />
                      </div>
                    </div>
                    {/* Details */}
                    <div className="h-full overflow-y-auto w-full">
                      <div className="flex flex-col gap-4 w-full">
                        <CommunityDetailsTopCards />
                        <div className="grid grid-cols-4 gap-4 w-full">
                          <CarrotPotCard />
                          <PeriodsCard />
                          <PriorityCards />
                        </div>
                        <Card className="w-full p-8 pb-4 bg-muted border-none ">
                          <div className="flex items-center w-full mb-4">
                            <h1 className="text-[20px] font-semibold">Tasks</h1>
                            <div className="flex gap-4 ml-auto">
                              <Search placeholder="Search Tasks..." />
                              <Button variant="outline">Filter</Button>
                            </div>
                          </div>
                          {/* <div>
                            <TaskTab />
                            <div className="pt-4">
                              <Pagination
                                count={20}
                                title="Tasks"
                                totalPages={10}
                                className="bg-transparent"
                              />
                            </div>
                          </div> */}
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
              <div className="mx-auto flex gap-2 justify-start">
                <Button
                  variant="outline"
                  className="w-[100px]"
                  onClick={() => {
                    prev();
                  }}
                  type="button"
                  disabled={currentStep === 0}
                >
                  Back
                </Button>{" "}
                {currentStep === steps.length - 1 ? (
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    Create Community
                  </Button>
                ) : null}
                {/* <Button
                  variant="default"
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  Create Community
                </Button> */}
                {currentStep !== steps.length - 1 ? (
                  <Button
                    onClick={() => {
                      next();
                    }}
                    type="button"
                    className="w-[100px]"
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
