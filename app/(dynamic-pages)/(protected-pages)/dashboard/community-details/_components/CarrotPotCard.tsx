import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface CarrotPotCardProps {}

const CarrotPotCard: FC<CarrotPotCardProps> = ({}) => {
  return (
    <Card className="flex flex-col items-center justify-center p-8 bg-primary">
      <div className="text-4xl text-center text-white ">
        <p className=" whitespace-nowrap">Carrot Pot</p>
        <p>2.340</p>
        <div className="flex items-center gap-2 text-[12px]">
          <p className="text-xs whitespace-nowrap">80 from Community Fee</p>
          <Info size={14} />
        </div>
      </div>
      <Image
        src="/images/carrot-pot.png"
        width={200}
        height={200}
        alt="Carrot Pot"
      />
    </Card>
  );
};

export default CarrotPotCard;

{
  /* <div
      className=" h-[340px] w-full  bg-cover bg-center text-2xl bg-primary shadow-sm rounded-md"
      style={{ backgroundImage: "url(/images/carrot-pot.png)" }}
    >
      <div className="w-full h-full p-8 text-white backdrop-brightness-75">
        <p className="whitespace-nowrap">Carrot Pot</p>
        <p>2.340</p>
        <div className="flex items-center gap-2 ">
          <p className="text-xs whitespace-nowrap">80 from Community Fee</p>
          <Info size={14} />
        </div>
      </div>
    </div> */
}
