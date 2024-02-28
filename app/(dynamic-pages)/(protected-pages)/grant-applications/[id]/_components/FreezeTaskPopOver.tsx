'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { freezeTaskAction } from "@/data/admin/tasks";
import { useToastMutation } from "@/hooks/useToastMutation";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";

export function FreezeTaskPopOver({ task_id }: { task_id: string }) {

    const { handleSubmit } = useForm()

    const { mutate: freezeTask } = useToastMutation(async (task_id: string) => {
        await freezeTaskAction(task_id)
    }, {
        loadingMessage: "Freezing Task..",
        errorMessage: "Failed to freeze",
        successMessage: "Task has been frozen!",
    })

    const onSubmit = () => {
        freezeTask(task_id)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center justify-center w-fit p-3 h-10 mb-4 rounded-md border">
                    <Settings size={16} />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-32" side="top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Button variant="ghost" className="w-full">
                        Freeze Task
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}