import GoBack from "@/components/ui/GoBack";
import TaskDetail from "./_components/TaskDetail";
import DraftTaskDetail from "./_components/DraftTaskDetail";
import { getTaskById } from "@/data/user/tasks";

export default async function TaskDetailsPage({ params }: { params: unknown }) {
  const parsedParams = params as { id: string };
  const { id } = parsedParams;
  const task = await getTaskById(id);
  const isDraft = task.task_status === "draft";
  return (
    <main className="mx-4 mt-4 mb-20">
      <GoBack />
      {/* TODO: draft task component. NOTE: This is a placeholder for actual condition. After figuring out rendering logic, modify accordingly */}
      {isDraft ? <DraftTaskDetail id={id} /> : <TaskDetail id={id} />}
      {/* <TaskDetail id={id} /> */}
    </main>
  );
}
