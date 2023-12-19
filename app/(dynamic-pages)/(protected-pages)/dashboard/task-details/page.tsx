import GoBack from "@/components/ui/GoBack";
import { FC } from "react";
import TaskDetail from "./TaskDetail";

interface pageProps {}

const TaskDetailsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-4 mt-4 mb-4">
      <GoBack />

      <TaskDetail />
    </main>
  );
};

export default TaskDetailsPage;
