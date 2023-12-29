import CreateTaskForm from "@/components/tip-tap-Editor/CreateTaskForm";
import GoBack from "@/components/ui/GoBack";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative mx-3 mb-10 sm:mx-6 xl:mx-60">
      <div className="mt-4 mb-6">
        <GoBack />
      </div>
      <h1 className="mb-8 text-xl">Create Task</h1>

      <CreateTaskForm />
    </main>
  );
};

export default page;
