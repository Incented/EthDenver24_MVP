import {
  ArrowBigUp,
  Calendar,
  Carrot,
  CheckCircle,
  Hourglass,
  LucideIcon,
} from "lucide-react";

export const taskData: {
  taskStatus: string;
  value: number;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    taskStatus: "Completed Task",
    value: 50,
    description: "Total reward : 866 carrots",
    Icon: Calendar,
  },
  {
    taskStatus: "Prioritized",
    value: 10,
    description: "Priority by staking for or against",
    Icon: ArrowBigUp,
  },
  {
    taskStatus: "In Progress",
    value: 6,
    description: "Working on a solution",
    Icon: Hourglass,
  },
  {
    taskStatus: "In Review",
    value: 4,
    description: "Contributionn needs validation",
    Icon: CheckCircle,
  },
  {
    taskStatus: "Total Carrots",
    value: 300,
    description: "My carrot stock",
    Icon: Carrot,
  },
];

export const carrotDenomination = 40.2;
