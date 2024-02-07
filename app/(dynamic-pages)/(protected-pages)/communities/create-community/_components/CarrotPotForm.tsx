import { Input } from "@/components/ui/input";
import { AccordionList } from "./Accordion";
import { carrotPotItems, rewardAccordionItems } from "./createCommunityData";
import {
  RewardSettingsSchema,
  rewardSettingsSchema,
  carrotPotSchema,
  CarrotPotSchema,
} from "./createCommunitySchema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/Progress";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import TokenPurchaseModal from "@/components/ui/token-purchase-modal";
import { set } from "nprogress";

export default function CarrotPotForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
}: FormProps<CarrotPotSchema>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    const input = inputRef.current;
    if (input) {
      input.select(); // Select the text
      document.execCommand("copy"); // Copy the text
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<CarrotPotSchema>({
    resolver: zodResolver(carrotPotSchema),
    defaultValues: {
      community_live_status: initialFormValues?.community_live_status,
      community_token: initialFormValues?.community_token,
      // carrot_pot_address: carrotPotSettings?.carrot_pot_address || "",
    },
  });

  const onSubmit: SubmitHandler<CarrotPotSchema> = (data) => {
    onFormSubmit(data);
  };
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
                    <Controller
                      name="community_live_status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-label="Community live status"
                            className="pr-2"
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="live">Live</SelectItem>
                              <SelectItem value="testnet">Testnet</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {/* <Select>
                      <SelectTrigger
                        aria-label="Community live status"
                        className="pr-2"
                      >
                        <SelectValue placeholder="Live" defaultValue="live" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="testnet">Testnet</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select> */}
                    <p className="text-muted-foreground text-sm">
                      Choose the status
                    </p>
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Choose token</span>
                    <Controller
                      name="community_token"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-label="Choose token"
                            className="pr-2"
                          >
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="carrot">$Carrot</SelectItem>
                              <SelectItem value="token_1">token_1</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {/* <Select>
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
                    </Select> */}
                    <p className="text-muted-foreground text-sm">
                      {`Choose the token you'd like to use`}
                    </p>
                  </div>
                  <div className="relative space-y-1">
                    <span className="text-sm">Carrot pot address</span>
                    <div className="relative">
                      {/* <Controller
                        name="carrot_pot_address"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            ref={inputRef}
                            className="w-full"
                            placeholder="0x...2ue23541835232"
                            defaultValue="0x...2ue23541835232" // Replace with the actual value you want to copy
                            readOnly
                            // Makes the input read-only since we don't want the user to edit it
                          />
                        )}
                      />
                      {errors.carrot_pot_address?.message && (
                        <p className="text-sm text-red-600 dark:text-red-500">
                          {errors.carrot_pot_address?.message}
                        </p>
                      )} */}

                      <Input
                        ref={inputRef}
                        className="w-full"
                        defaultValue="0x...2ue23541835232" // Replace with the actual value you want to copy
                        readOnly // Makes the input read-only since we don't want the user to edit it
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
                          <g clipPath="url(#clip0_22_4016)">
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
                      <TokenPurchaseModal
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                      />
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
                          <g clipPath="url(#clip0_22_1199)">
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
            onClick={moveToPrevStep}
            type="button"
            disabled={!moveToPrevStep}
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
