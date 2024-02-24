'use client'

import { demoMakeDemoUsersPrioritiseTask, demoMakeDemoUsersPrioritizeNewTasks, demoMakeDemoUsersValidateContributions } from "@/data/admin/demo-scripts";
import { useToastMutation } from "@/hooks/useToastMutation";
import { useRouter } from "next/navigation";
import { useKey } from "rooks";

export function DemoAutomations({ taskId }: {
    taskId: string;
}) {
    const router = useRouter();
    const { mutate: makeDemoUsersPrioritiseTask } = useToastMutation(demoMakeDemoUsersPrioritiseTask, {
        loadingMessage: "Prioritizing task...",
        successMessage: "Task prioritized",
        errorMessage: "Failed to prioritize task",
        onSuccess: () => {
            router.refresh()
        }
    });
    const { mutate: makeDemoUsersValidateContribution } = useToastMutation(demoMakeDemoUsersValidateContributions, {
        loadingMessage: "Validating contributions...",
        successMessage: "Contributions validated",
        errorMessage: "Failed to validate contributions",
        onSuccess: () => {
            router.refresh()
        }
    });
    const { mutate: makeDemoUsersPrioritiseAllNewTasks } = useToastMutation(demoMakeDemoUsersPrioritizeNewTasks, {
        loadingMessage: "Prioritizing new tasks...",
        successMessage: "Tasks prioritized",
        errorMessage: "Failed to prioritize tasks",
        onSuccess: () => {
            router.refresh()
        }
    });

    useKey(["KeyP"], (event) => {
        // if shift key is pressed
        if (event.shiftKey) {
            makeDemoUsersPrioritiseTask(taskId);
        }
    })

    useKey(["KeyV"], (event) => {
        // if shift key is pressed
        if (event.shiftKey) {
            makeDemoUsersValidateContribution(taskId);
        }
    })

    useKey(["KeyV"], (event) => {
        // if shift key is pressed
        if (event.shiftKey) {
            makeDemoUsersPrioritiseAllNewTasks();
        }
    })

    return <p></p>;
}