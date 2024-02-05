import { Input } from "@/components/ui/input";
import { AccordionList } from "./Accordion";
import { carrotPotItems, rewardAccordionItems } from "./createCommunityData";
import {
  RewardSettingsSchema,
  rewardSettingsSchema,
} from "./createCommunitySchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/Progress";
import { toast } from "sonner";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";

export default function CarrotPotForm({
  rewardSettings,
  setRewardsSettings,
  currentStep,
  setCurrentStep,
}: {
  rewardSettings: RewardSettingsSchema | undefined;
  setRewardsSettings: (data: RewardSettingsSchema) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    const input = inputRef.current;
    if (input) {
      input.select(); // Select the text
      document.execCommand("copy"); // Copy the text
      // Optionally, you can show a tooltip or a message confirming the copy action
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RewardSettingsSchema>({
    resolver: zodResolver(rewardSettingsSchema),
    defaultValues: {
      proposalReward: rewardSettings?.proposalReward ?? 0,
      prioritizationReward: rewardSettings?.prioritizationReward ?? 0,
      validationReward: rewardSettings?.validationReward ?? 0,
      claimStakeAmount: rewardSettings?.claimStakeAmount ?? 100,
    },
  });

  const onSubmit: SubmitHandler<RewardSettingsSchema> = (data) => {
    // const numericData = {
    //   ...data,
    //   proposalReward: Number(data.proposalReward),
    //   prioritizationReward: Number(data.prioritizationReward),
    //   validationReward: Number(data.validationReward),
    //   claimStakeAmount: Number(data.claimStakeAmount),
    // };
    // setRewardsSettings(numericData);
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    toast("Carrot pot set up successfully", { duration: 5000 });
    // localStorage.setItem("currentStep", String(newStep));
    // localStorage.setItem("rewardSettings", JSON.stringify(data));
  };

  //   useEffect(() => {
  //     const savedRewardSettings = localStorage.getItem("rewardSettings");
  //     if (savedRewardSettings) {
  //       const parsedDetails = JSON.parse(savedRewardSettings);
  //       reset(parsedDetails); // This sets the form values to the saved data
  //     }
  //   }, [reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              Carrot Pot
            </p>
            <p className="text-sm leading-6">
              Manage the task reward for your community members.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 4/6</p> <p>60%</p>
            </div>
            <div className="py-1.5">
              <Progress value={60} className="w-full h-2" />
            </div>
          </div>
        </div>

        <div className="h-full overflow-hidden">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <div className="mt-2 grid grid-cols-1 gap-4 w-64">
                  <div className="relative space-y-1">
                    <span className="text-sm">Community live status</span>
                    <Select>
                      <SelectTrigger
                        aria-label="Community live status"
                        className="pr-2"
                      >
                        <SelectValue
                          placeholder="Offline"
                          defaultValue="offline"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-sm">
                      Choose the status
                    </p>
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Choose token</span>
                    <Select>
                      <SelectTrigger aria-label="choose token" className="pr-2">
                        <SelectValue
                          placeholder="$Carrot"
                          defaultValue="carrot"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="carrot">$Carrot</SelectItem>
                          <SelectItem value="token_1">token_1</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-sm">
                      {`Choose the token you'd like to use`}
                    </p>
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Carrot pot address</span>
                    <div className="relative">
                      <Input
                        ref={inputRef}
                        className="w-full"
                        defaultValue="0x...2ue23541835232" // Replace with the actual value you want to copy
                        // Makes the input read-only since we don't want the user to edit it
                      />
                      <button
                        onClick={(event) => {
                          event.preventDefault(); // Prevent form submission
                          toast("Address copied to clipboard", {
                            duration: 3000,
                          });
                          handleCopy();
                        }}
                        className="absolute right-2 top-1/3 text-sm text-muted-foreground"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_22_4016)">
                            <path
                              d="M2.66666 10.6667C1.93333 10.6667 1.33333 10.0667 1.33333 9.33334V2.66668C1.33333 1.93334 1.93333 1.33334 2.66666 1.33334H9.33333C10.0667 1.33334 10.6667 1.93334 10.6667 2.66668M6.66666 5.33334H13.3333C14.0697 5.33334 14.6667 5.9303 14.6667 6.66668V13.3333C14.6667 14.0697 14.0697 14.6667 13.3333 14.6667H6.66666C5.93028 14.6667 5.33333 14.0697 5.33333 13.3333V6.66668C5.33333 5.9303 5.93028 5.33334 6.66666 5.33334Z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="stroke-foreground"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_22_4016">
                              <rect width="16" height="16" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        className="flex gap-2"
                        onClick={(event) => {
                          event.preventDefault(); // Prevent form submission
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_22_4075)">
                            <path
                              d="M12.06 6.91334C12.6902 7.1483 13.251 7.53836 13.6905 8.04748C14.13 8.55659 14.434 9.1683 14.5745 9.82606C14.7149 10.4838 14.6872 11.1664 14.494 11.8106C14.3008 12.4548 13.9482 13.0399 13.4689 13.5118C12.9897 13.9836 12.3991 14.327 11.752 14.5102C11.1048 14.6933 10.4219 14.7103 9.76643 14.5596C9.11096 14.409 8.50406 14.0954 8.00186 13.648C7.49967 13.2006 7.1184 12.6338 6.89331 12M4.66665 4.00001H5.33331V6.66668M11.14 9.25334L11.6066 9.72668L9.72665 11.6067M9.33331 5.33334C9.33331 7.54248 7.54245 9.33334 5.33331 9.33334C3.12417 9.33334 1.33331 7.54248 1.33331 5.33334C1.33331 3.1242 3.12417 1.33334 5.33331 1.33334C7.54245 1.33334 9.33331 3.1242 9.33331 5.33334Z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="stroke-foreground"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_22_4075">
                              <rect width="16" height="16" />
                            </clipPath>
                          </defs>
                        </svg>
                        Purchase
                      </Button>
                      <Button
                        variant="default"
                        className="flex gap-2"
                        onClick={(event) => {
                          event.preventDefault(); // Prevent form submission
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_22_1199)">
                            <path
                              d="M14.6667 1.33334L7.33334 8.66668M14.6667 1.33334L10 14.6667L7.33334 8.66668M14.6667 1.33334L1.33334 6.00001L7.33334 8.66668"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="stroke-border"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_22_1199">
                              <rect width="16" height="16" />
                            </clipPath>
                          </defs>
                        </svg>
                        Request from Incented
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AccordionList accordionItems={carrotPotItems} />
          </div>
        </div>
      </div>
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={() => {
              setCurrentStep(currentStep - 1);
              const savedStep = localStorage.getItem("currentStep");
              if (savedStep !== null) {
                localStorage.setItem(
                  "currentStep",
                  String(Number(savedStep) - 1)
                );
              }
            }}
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
