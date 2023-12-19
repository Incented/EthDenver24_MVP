"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface GoBackProps {}

const GoBack: FC<GoBackProps> = ({}) => {
  const router = useRouter();
  return (
    <ArrowLeft
      onClick={() => router.back()}
      size={20}
      className="cursor-pointer"
    />
  );
};

export default GoBack;
