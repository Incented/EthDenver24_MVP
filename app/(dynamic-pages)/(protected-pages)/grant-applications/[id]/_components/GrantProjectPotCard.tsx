import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface GrantProjectPotCardProps { }

const GrantProjectPotCard: FC<GrantProjectPotCardProps> = ({ }) => {
  return (
    <Card className="flex flex-col items-center justify-center w-full col-span-1 p-8 py-6 bg-[#12AAFF]">
      <div className="mb-10 text-center text-white">
        <p className="mb-1 text-3xl font-medium leading-9 ">Treasury</p>
        <p className="text-4xl font-extrabold">178,021</p>
        <div className="flex items-center justify-center w-full gap-1 py-1">
          <p className="text-xs font-normal whitespace-nowrap">
            580 from Community Fee
          </p>
          <Info size={14} />
        </div>
      </div>
      <div className="relative h-[174px] w-full">
        <Image
          src="/images/arbitrum-logo.png"
          fill
          alt="Carrot Pot"
          className="object-contain opacity-50"
        />
      </div>
    </Card>
  );
};

export default GrantProjectPotCard;


