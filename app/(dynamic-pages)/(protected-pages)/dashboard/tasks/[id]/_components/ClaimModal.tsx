"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Carrot, Info, Wallet } from "lucide-react";

interface ClaimModalProps {}

const ClaimModal: FC<ClaimModalProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full bg-gray-600 hover:bg-gray-700">Claim</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim</DialogTitle>
          <DialogDescription>
            You will stake the full “Claim-Stake” amount to reserve the right to
            contribute.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">250.00</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <Info size={14} className="" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="">
                    <p className="mb-2 text-sm">Claim Stake-Amount</p>
                    <p className="mb-1 text-xs w-60">
                      The % amount a user needs to stake relative to the
                      assigned reward the task has assigned. If this parameter
                      is not set, it defaults to 100%
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2 px-4 py-2 text-sm border rounded-xl">
            <Carrot size={20} /> <p>Carrots</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">$ 560926.30</p>

          <div className="flex items-center gap-2">
            <Wallet size={20} className="text-primary" />
            <p className="text-muted-foreground">300.00</p>
          </div>
        </div>
        <Button className="w-full bg-gray-600 hover:bg-gray-700">Claim</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimModal;
