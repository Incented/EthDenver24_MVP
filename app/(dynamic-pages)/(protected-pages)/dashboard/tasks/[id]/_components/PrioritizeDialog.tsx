'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { prioritizeTaskAction } from "@/data/user/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const prioritizeTaskFormSchema = z.object({
    count: z.number().min(0.01, "Count must be at least 0.01"), // Allow decimals with a minimum of 0.01
});

export type PrioritizeTaskFormSchema = z.infer<typeof prioritizeTaskFormSchema>;

export function PrioritizeDialog({
    task_id,
    isTaskCreator,
    isPrioritizedByUser,
    isWithinPrioritizedPeriod,
    isUserMemberOfCommunity,
}: {
    task_id: string;
    isTaskCreator: boolean;
    isPrioritizedByUser: boolean;
    isWithinPrioritizedPeriod: boolean;
    isUserMemberOfCommunity: boolean;
}) {
    const [actionType, setActionType] = useState<'prioritize' | 'deprioritize'>('prioritize');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { mutate: prioritizeTask } = useToastMutation(async (data: PrioritizeTaskFormSchema) => {
        await prioritizeTaskAction({
            task_id,
            stakeAmount: data.count,
        })

    }, {
        loadingMessage: "Prioritizing..",
        errorMessage: "Failed to prioritize",
        successMessage: "Added Prioritization!",
    })


    const { handleSubmit, register } = useForm<PrioritizeTaskFormSchema>()

    const onSubmit = (data: PrioritizeTaskFormSchema) => {
        const adjustedData = {
            ...data,
            count: actionType === 'deprioritize' ? -Math.abs(data.count) : Math.abs(data.count),
        };
        prioritizeTask(adjustedData)
    }

    const handlePrioritizeClick = () => {

        setActionType('prioritize')
        setIsDialogOpen(false)
    };
    const handleDeprioritizeClick = () => {
        setActionType('deprioritize')
        setIsDialogOpen(false)
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className="w-full">
                <Button className="w-full" disabled={isTaskCreator || isPrioritizedByUser || !isWithinPrioritizedPeriod || !isUserMemberOfCommunity}>
                    Prioritize
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Prioritize</h2>
                        <p className="text-sm mb-4 text-muted-foreground">
                            Prioritizing is a key interaction where users stake carrots to
                            influence the importance and urgency of proposed tasks.
                        </p>
                        <label htmlFor="stakeAmount" className="block text-sm mb-2 font-medium text-foreground">
                            Stake to Prioritize
                        </label>
                        <div className="flex flex-col gap-2 p-4 rounded-lg border shadow-sm">
                            <div className="mt-1 flex gap-0 justify-between w-full relative rounded-md">
                                <Input
                                    type="number"
                                    {...register("count", { valueAsNumber: true, min: 0.01 })}
                                    placeholder="0.00"
                                    className="w-32"
                                    step="0.01"
                                />
                                <div className="flex gap-2 rounded-full p-2 border items-center">
                                    <label className="sr-only">Carrots</label>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-muted-foreground" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.91303 6.56522C4.07521 8.82048 2 14.67 2 14.67C2 14.67 7.83487 12.6001 10.0915 10.769M11.2031 9.20725C11.3631 8.68846 11.3789 8.13591 11.2488 7.60882C11.1188 7.08173 10.8477 6.59998 10.4647 6.2152C10.0817 5.83042 9.60121 5.55712 9.07473 5.4246C8.54825 5.29208 7.99563 5.30533 7.47611 5.46293M6.00105 9.33528L5.00079 8.33502" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.67 6.00104C14.67 6.00104 13.9098 4.66736 12.6695 4.66736C11.7319 4.66736 10.6689 6.00104 10.6689 6.00104C10.6689 6.00104 11.4291 7.33473 12.6695 7.33473C13.9098 7.33473 14.67 6.00104 14.67 6.00104Z" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 2.66684L14.0032 14.67M10.6689 2C10.6689 2 9.33526 2.7602 9.33526 4.00053C9.33526 5.24085 10.6689 6.00105 10.6689 6.00105C10.6689 6.00105 12.0026 4.94944 12.0026 4.00053C12.0026 2.7602 10.6689 2 10.6689 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="text-muted-foreground sm:text-sm" id="carrots-amount">
                                        Carrots
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-normal text-muted-foreground">
                                    $ 0.00
                                </span>
                                <span className="text-sm font-normal text-muted-foreground">
                                    300.00
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2 w-full ">
                            <Button className=" w-full gap-2" variant="secondary" data-submit-type="deprioritize" onClick={handleDeprioritizeClick}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-foreground" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.91303 6.56522C4.07521 8.82048 2 14.67 2 14.67C2 14.67 7.83487 12.6001 10.0915 10.769M11.2031 9.20725C11.3631 8.68846 11.3789 8.13591 11.2488 7.60882C11.1188 7.08173 10.8477 6.59998 10.4647 6.2152C10.0817 5.83042 9.60121 5.55712 9.07473 5.4246C8.54825 5.29208 7.99563 5.30533 7.47611 5.46293M6.00105 9.33528L5.00079 8.33502" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.67 6.00104C14.67 6.00104 13.9098 4.66736 12.6695 4.66736C11.7319 4.66736 10.6689 6.00104 10.6689 6.00104C10.6689 6.00104 11.4291 7.33473 12.6695 7.33473C13.9098 7.33473 14.67 6.00104 14.67 6.00104Z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 2.66684L14.0032 14.67M10.6689 2C10.6689 2 9.33526 2.7602 9.33526 4.00053C9.33526 5.24085 10.6689 6.00105 10.6689 6.00105C10.6689 6.00105 12.0026 4.94944 12.0026 4.00053C12.0026 2.7602 10.6689 2 10.6689 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Deprioritize
                            </Button>
                            <Button variant="default" className="w-full gap-2" data-submit-type="prioritize" onClick={handlePrioritizeClick}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="stroke-white"
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
                                </svg>Prioritize
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>)
}