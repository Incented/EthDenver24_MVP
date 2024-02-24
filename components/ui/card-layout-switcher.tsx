"use client";
import { setCardLayout } from "@/app/(dynamic-pages)/(protected-pages)/dashboard/(my-dashboard)/card-ui";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";
import { Button } from "./button";

export function CardLayoutSwitcher() {
  const { setIsVertical: setVerticalLayoutContextValue, isVertical } =
    useContext(CardVerticalLayoutContext);
  const { mutate } = useMutation(setCardLayout, {
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred.");
    },
  });
  const toggleVerticalLayout = () => {
    mutate(false);
    setVerticalLayoutContextValue(false);
  };
  const toggleHorizontalLayout = () => {
    mutate(true);
    setVerticalLayoutContextValue(true);
  };
  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "p-3 px-3",
          !isVertical
            ? "ring-2 ring-zinc-400 shadow-sm ring-offset-zinc-400"
            : ""
        )}
        onClick={toggleVerticalLayout}
      >
        <LayoutGrid size={16} />
      </Button>
      <Button
        variant="outline"
        className={cn(
          "p-3 px-3 hidden sm:block",
          isVertical
            ? "ring-2 ring-zinc-400 shadow-sm ring-offset-zinc-400"
            : ""
        )}
        onClick={toggleHorizontalLayout}
      >
        <LayoutList size={16} />
      </Button>
    </>
  );
}
