import GoBack from "@/components/ui/GoBack";
import TaskDetail from "./_components/TaskDetail";
import DraftTaskDetail from "./_components/DraftTaskDetail";
import { getTaskById } from "@/data/user/tasks";

export default async function TaskDetailsPage({ params }: { params: unknown }) {
  const parsedParams = params as { id: string };
  const { id } = parsedParams;
  const task = await getTaskById(id);
  const isTaskPublished = task.is_task_published;
  return (
    <main className="md:mx-4 md:pt-0 md:px-8 md:pb-8  px-6 pb-8 mt-4">
      <GoBack />
      {/* TODO: draft task component. NOTE: This is a placeholder for actual condition. After figuring out rendering logic, modify accordingly */}
      {!isTaskPublished ? (
        <DraftTaskDetail id={id} task={task} />
      ) : (
        <TaskDetail id={id} task={task} />
      )}
      {/* <TaskDetail id={id} /> */}
      {/* <TaskDetail id={id} /> */}
    </main>
  );
}
