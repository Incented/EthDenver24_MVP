import GoBack from "@/components/ui/GoBack";
import { FC } from "react";
import TaskDetail from "./_components/TaskDetail";

interface pageProps {}

const TaskDetailsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-4 mt-4 mb-20">
      <GoBack />

      <TaskDetail />
    </main>
  );
};

export default TaskDetailsPage;
