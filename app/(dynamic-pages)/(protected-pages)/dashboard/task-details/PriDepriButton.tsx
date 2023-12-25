import { CarrotStrikIcon } from "@/components/Icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carrot } from "lucide-react";
import { FC } from "react";

interface PriDepriButtonProps {}

const PriDepriButton: FC<PriDepriButtonProps> = ({}) => {
  return (
    <Card className="flex flex-row items-center p-2 space-x-3 rounded-md bg-background">
      <Button variant="outline" className="bg-[#78716C] w-full">
        <CarrotStrikIcon />
      </Button>

      <p className="w-full text-center">Prioritize</p>
      <Button className="w-full">
        <Carrot />
      </Button>
    </Card>
  );
};

export default PriDepriButton;
