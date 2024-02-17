"use client";

import React, { useState } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { RadioGroup } from "./radio-group";
import { Button } from "./button";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const TOKEN_VALUE_PER_DOLLAR = 1; // Example token value denomination

export function TokenPurchaseModal({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(2); // Initial total steps

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dollarValue = parseFloat(e.target.value);
    setAmount(dollarValue);
    setTokens(dollarValue * TOKEN_VALUE_PER_DOLLAR);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tokenValue = parseFloat(e.target.value);
    setTokens(tokenValue);
    setAmount(tokenValue / TOKEN_VALUE_PER_DOLLAR);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission or final step action
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  //   const renderStepContent = () => {
  //     switch (currentStep) {
  //       case 1:
  //         return (
  //           <>
  //             <Input
  //               type="number"
  //               value={amount.toString()}
  //               onChange={handleAmountChange}
  //               placeholder="Enter amount in dollars"
  //             />
  //             <Input
  //               type="number"
  //               value={tokens.toString()}
  //               onChange={handleTokenChange}
  //               placeholder="Enter token amount"
  //             />
  //           </>
  //         );
  //       case 2:
  //         return (
  //           <RadioGroup
  //             value={paymentMethod}
  //             onChange={(e) =>
  //               handlePaymentMethodChange((e.target as HTMLInputElement).value)
  //             }
  //           >
  //             <RadioGroupPrimitive.Item value="credit" id="credit">
  //               Credit Card
  //             </RadioGroupPrimitive.Item>
  //             <RadioGroupPrimitive.Item value="wallet" id="wallet">
  //               Wallet
  //             </RadioGroupPrimitive.Item>
  //           </RadioGroup>
  //         );
  //       // Add more cases for additional steps
  //       default:
  //         return null;
  //     }
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setOpen(false);
    setIsDialogOpen?.(false);
  };

  return (
    // <Dialog
    //   open={isDialogOpen}
    //   onOpenChange={setIsDialogOpen}
    //   data-testid="token-purchase-modal"
    // >
    //   <DialogTrigger asChild>
    //     <Button
    //       variant="outline"
    //       className="flex gap-2 bg-muted border-none hover:bg-secondary"
    //       onClick={(event) => {
    //         event.preventDefault(); // Prevent form submission
    //       }}
    //     >
    //       <svg
    //         width="16"
    //         height="16"
    //         viewBox="0 0 16 16"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <g clipPath="url(#clip0_22_4075)">
    //           <path
    //             d="M12.06 6.91334C12.6902 7.1483 13.251 7.53836 13.6905 8.04748C14.13 8.55659 14.434 9.1683 14.5745 9.82606C14.7149 10.4838 14.6872 11.1664 14.494 11.8106C14.3008 12.4548 13.9482 13.0399 13.4689 13.5118C12.9897 13.9836 12.3991 14.327 11.752 14.5102C11.1048 14.6933 10.4219 14.7103 9.76643 14.5596C9.11096 14.409 8.50406 14.0954 8.00186 13.648C7.49967 13.2006 7.1184 12.6338 6.89331 12M4.66665 4.00001H5.33331V6.66668M11.14 9.25334L11.6066 9.72668L9.72665 11.6067M9.33331 5.33334C9.33331 7.54248 7.54245 9.33334 5.33331 9.33334C3.12417 9.33334 1.33331 7.54248 1.33331 5.33334C1.33331 3.1242 3.12417 1.33334 5.33331 1.33334C7.54245 1.33334 9.33331 3.1242 9.33331 5.33334Z"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             className="stroke-foreground"
    //           />
    //         </g>
    //         <defs>
    //           <clipPath id="clip0_22_4075">
    //             <rect width="16" height="16" />
    //           </clipPath>
    //         </defs>
    //       </svg>
    //       Purchase
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader></DialogHeader>
    //     <form onSubmit={(e) => e.preventDefault()}>
    //       {renderStepContent()}
    //       <button type="button" onClick={handleNextStep}>
    //         Next
    //       </button>
    //     </form>
    //   </DialogContent>
    // </Dialog>

    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 bg-muted border-none hover:bg-secondary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_22_4075)">
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
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg leading-[18px] text-foreground ">
            Purchase token
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4">
            <div className="relative space-y-1 w-full">
              <span className="text-sm">Amount</span>
              <Select>
                <SelectTrigger
                  aria-label="Community live status"
                  className="pr-2"
                >
                  <SelectValue placeholder="0" defaultValue="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">0</SelectItem>
                    <SelectItem value="2">0</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="absolute right-7 top-1/2 text-sm text-muted-foreground">
                $
              </p>
            </div>

            <div className="flex flex-col justify-end h-auto pb-1">
              <div className="rounded-full bg-muted p-2.5 items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6667 2L13.3334 4.66667M13.3334 4.66667L10.6667 7.33333M13.3334 4.66667H2.66669M5.33335 14L2.66669 11.3333M2.66669 11.3333L5.33335 8.66667M2.66669 11.3333H13.3334"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-primary"
                  />
                </svg>
              </div>
            </div>

            <div className="relative space-y-1 w-full">
              <span className="text-sm">You get</span>
              <Select>
                <SelectTrigger
                  aria-label="Community live status"
                  className="pr-2"
                >
                  <SelectValue placeholder="0" defaultValue="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">0</SelectItem>
                    <SelectItem value="2">0</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* {renderStepContent()} */}
        </form>
        <DialogFooter>
          <Button onClick={handleNextStep}>Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TokenPurchaseModal;
