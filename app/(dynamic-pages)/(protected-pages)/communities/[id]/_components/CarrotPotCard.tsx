import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface CarrotPotCardProps {}

const CarrotPotCard: FC<CarrotPotCardProps> = ({}) => {
  return (
    <Card className="col-span-1 flex flex-col w-full items-center justify-center p-8 py-6 bg-primary">
      <div className=" text-center text-white ">
        <p className=" text-3xl leading-9 font-medium">Carrot Pot</p>
        <p className="font-extrabold">2.340</p>
        <div className="flex items-center w-full justify-center py-1 gap-1">
          <p className="text-xs font-normal whitespace-nowrap">
            80 from Community Fee
          </p>
          <Info size={14} />
        </div>
      </div>
      <div className="relative h-[174px] w-full">
        <Image
          src="/images/carrot-pot.png"
          fill
          alt="Carrot Pot"
          className="opacity-50 object-contain"
        />
      </div>
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
