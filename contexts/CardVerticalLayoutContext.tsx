"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type CardVerticalLayoutContextType = {
  isVertical: boolean;
  toggleVerticalLayout: () => void;
  setIsVertical: Dispatch<SetStateAction<boolean>>;
};

export const CardVerticalLayoutContext = createContext(
  {} as CardVerticalLayoutContextType
);

export const CardVerticalLayoutProvider = ({
  children,
  initialValue = true,
}: {
  children: React.ReactNode;
  initialValue?: boolean;
}) => {
  const [isVertical, setIsVertical] = useState<boolean>(initialValue);

  const toggleVerticalLayout = () => {
    setIsVertical(!isVertical);
  };

  return (
    <CardVerticalLayoutContext.Provider
      value={{ isVertical, toggleVerticalLayout, setIsVertical }}
    >
      {children}
    </CardVerticalLayoutContext.Provider>
  );
};
