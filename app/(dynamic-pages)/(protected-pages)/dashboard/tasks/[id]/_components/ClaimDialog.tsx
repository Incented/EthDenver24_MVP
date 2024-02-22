"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { claimTaskAction } from "@/data/user/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { Carrot, Info, Wallet } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { carrotDenomination } from "../../../(my-dashboard)/data";
import { TokenData } from "./TokenData";

interface ClaimDialogProps {
  claimStakeAmount: number | null;
  task_id: string;
}

const ClaimDialog: FC<ClaimDialogProps> = ({ claimStakeAmount, task_id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleSubmit } = useForm();
  const { mutate: claimTask } = useToastMutation(async () => {
    await claimTaskAction(task_id);
  }, {
    loadingMessage: "Claiming task...",
    successMessage: "Task claimed successfully!",
    errorMessage: "Failed to claim task",
  });

  const onSubmit = () => {
    claimTask();
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full"
          variant="tertiary"
        >Claim</Button>
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

          <div className="flex gap-2 px-4 py-2 text-sm border rounded-xl">
            <Carrot size={20} /> <p>Carrots</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-lg border shadow-sm">
          <div className="mt-1 flex gap-0 justify-between w-full relative rounded-md">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{claimStakeAmount}</h1>
              <TooltipWrapper tooltipTrigger={<Info size={14} className="" />} tooltipContent={<div className="flex flex-col">
                <p className="text-xs leading-5 font-semibold">Claim Stake-Amount</p>
                <p className=" text-xs leading-5 w-72 text-muted-foreground">
                  The % amount a user needs to stake relative to the
                  assigned reward the task has assigned. If this parameter
                  is not set, it defaults to 100%
                </p>
              </div>} />
            </div>
            <TokenData />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-normal text-muted-foreground">
              $ {claimStakeAmount ? (claimStakeAmount * carrotDenomination).toFixed(4) : 0}
            </span>
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-primary" />
              <p className="text-muted-foreground text-sm">300.00</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            className="w-full uppercase tracking-wide font-normal"
            variant="tertiary"
            type="submit"
          >Claim</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimDialog;
