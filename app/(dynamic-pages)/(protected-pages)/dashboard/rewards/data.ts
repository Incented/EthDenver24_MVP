import { Carrot, CheckCircle, LucideIcon, Trophy } from "lucide-react";

export const rewardData: {
  title: string;
  value: number;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Total Rewards",
    value: 4700,
    description: "My carrot rewards",
    Icon: Trophy,
  },
  {
    title: "Staked Carrots",
    value: 600,
    description: "Potential rewards: 700 carrots",
    Icon: CheckCircle,
  },
  {
    title: "Total Winning Task",
    value: 25,
    description: "prioritize and Deprioritize",
    Icon: CheckCircle,
  },
  {
    title: "Claimed Rewards",
    value: 2500,
    description: "Carrots",
    Icon: CheckCircle,
  },
  {
    title: "Unclaimed Carrots",
    value: 2200,
    description: "My carrot stock",
    Icon: Carrot,
  },
];
