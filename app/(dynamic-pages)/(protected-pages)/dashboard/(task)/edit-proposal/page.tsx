import CreateTaskForm from "@/app/(dynamic-pages)/(protected-pages)/dashboard/(task)/edit-proposal/components/CreateTaskForm";
import GoBack from "@/components/ui/GoBack";
import { getAllNamesOfTaskTypes } from "@/data/user/tasks";
import {
  fetchSlimOrganizations,
  getAllOrganizationNames,
} from "@/data/user/organizations";

export default async function CreateTask() {
  const [taskTypes, communityNames] = await Promise.all([
    getAllNamesOfTaskTypes(),
    getAllOrganizationNames(),
  ]);
  return (
    <main className="relative mx-3 mb-40 sm:mx-6 xl:mx-60">
      <div className="mt-4 mb-6">
        <GoBack />
      </div>
      <h1 className="mb-8 text-3xl -tracking-[2.5%] font-semibold">
        Edit proposal
      </h1>

      <CreateTaskForm taskTypes={taskTypes} communityNames={communityNames} />
    </main>
  );
}
