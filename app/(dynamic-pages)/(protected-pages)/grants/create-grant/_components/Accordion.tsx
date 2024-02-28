"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const AccordionComponent = ({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: (event: React.MouseEvent) => void;
}) => (
  <details open={isOpen} className="space-y-2" onClick={onToggle}>
    <summary className="flex justify-between border-b">
      <span className="text-base leading-9 font-medium">{title}</span>
      <div className="flex items-center justify-end pr-1 h-9">
        {isOpen ? (
          <MinusIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </div>
    </summary>
    <p className="text-sm leading-6 font-light text-muted-foreground">
      {content}
    </p>
  </details>
);

export const AccordionList = ({
  accordionItems,
}: {
  accordionItems: {
    title: string;
    content: string;
    isOpen: boolean;
  }[];
}) => {
  const [openIndex, setOpenIndex] = useState(-1); // Set default state to -1 so no item is open by default

  const handleToggle = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default behavior of the details element
    setOpenIndex(openIndex !== index ? index : -1); // Toggle the open state by checking if the clicked index is not the current openIndex
  };

  return (
    <div className="flex-1 space-y-4 bg-muted h-full p-6 rounded-lg">
      {accordionItems.map((item, index) => (
        <AccordionComponent
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={handleToggle(index)}
        />
      ))}
    </div>
  );
};
