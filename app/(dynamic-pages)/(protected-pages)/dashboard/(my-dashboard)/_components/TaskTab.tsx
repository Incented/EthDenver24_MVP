import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TaskTabProps {}

type ITask = {
  taskCategory: string;
  tasks: {
    imageUrl: string;
    taskTitle: string;
    taskType: string;
    taskStatus: string;
  }[];
};

const data: ITask[] = [
  {
    taskCategory: "all task",
    tasks: [
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "Prioritized",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "Prioritized",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
    ],
  },
  {
    taskCategory: "priortized",
    tasks: [],
  },

  {
    taskCategory: "claimed",
    tasks: [],
  },
  {
    taskCategory: "in progress",
    tasks: [],
  },
  {
    taskCategory: "in review",
    tasks: [],
  },
  {
    taskCategory: "complete",
    tasks: [],
  },
  {
    taskCategory: "failed",
    tasks: [],
  },
  {
    taskCategory: "expired",
    tasks: [],
  },
  {
    taskCategory: "my proposals",
    tasks: [],
  },
];

const TaskTab: FC<TaskTabProps> = ({}) => {
  return (
    <Tabs defaultValue="all task" className="">
      <ScrollArea className="whitespace-nowrap">
        <TabsList className="w-full lg:w-fit">
          {data.map((task) => (
            <TabsTrigger
              key={task.taskCategory}
              value={task.taskCategory}
              className="capitalize"
            >
              {task.taskCategory}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {data.map((task) => (
        <TabsContent value={task.taskCategory} key={task.taskCategory}>
          <div className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {task.tasks.map((data, i) => (
              <TaskCard
                key={i}
                imageUrl="/images/task2.jpeg"
                taskTitle="Install trash container"
                taskType="Others"
                taskStatus="In Progress"
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TaskTab;
