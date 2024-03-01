'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { publishTaskAction } from "@/data/user/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SubmitDraftProposalDialog({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { mutate: publishTask, isLoading: isPublishingTask } =
        useToastMutation(
            async (id: string) => {
                publishTaskAction(id);
            },
            {
                loadingMessage: "Publishing Task..",
                successMessage: "New task created!",
                errorMessage: "Failed to create task",
                onSuccess: () => {
                    router.refresh();
                    setIsOpen(false);
                },
            }
        );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-32">
                    Submit Proposal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Are you sure you want to submit this proposal?
                </DialogHeader>
                <div className="flex gap-2">
                    <Button className="w-full" variant="outline" onClick={() => {
                        setIsOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button className="w-full" disabled={isPublishingTask} onClick={() => { publishTask(id) }}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}