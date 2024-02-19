import CreateTaskForm from "@/app/(dynamic-pages)/(protected-pages)/dashboard/tasks/create-task/components/CreateTaskForm";
import GoBack from "@/components/ui/GoBack";
import { getAllNamesOfTaskTypes, getTaskById } from "@/data/user/tasks";
import {
  fetchSlimOrganizations,
  getAllOrganizationNames,
} from "@/data/user/organizations";
import EditTaskForm from "../../create-task/components/EditTaskForm";

export default async function EditTask({ params }: { params: unknown }) {
  const { id } = params as { id: string };
  const [taskTypes, communities] = await Promise.all([
    getAllNamesOfTaskTypes(),
    getAllOrganizationNames(),
  ]);
  const task = await getTaskById(id);
  return (
    <div className="relative mx-3 mb-40 sm:mx-6 xl:mx-60">
      <div className="mt-4 mb-6">
        <GoBack />
      </div>
      <h1 className="mb-8 text-3xl -tracking-[2.5%] font-semibold">
        Edit proposal
      </h1>

      <EditTaskForm
        taskTypes={taskTypes}
        communities={communities}
        id={id}
        initialData={task}
      />
    </div>
  );
}
