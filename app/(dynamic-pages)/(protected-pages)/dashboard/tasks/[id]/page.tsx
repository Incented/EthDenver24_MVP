import GoBack from "@/components/ui/GoBack";
import TaskDetail from "./_components/TaskDetail";

export default function TaskDetailsPage({ params }: { params: unknown }) {
  const parsedParams = params as { id: string };
  const { id } = parsedParams;
  return (
    <main className="mx-4 mt-4 mb-20">
      <GoBack />
      <TaskDetail id={id} />
    </main>
  );
}
