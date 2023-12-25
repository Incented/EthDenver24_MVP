"use client";

import { Editor, EditorProvider, useCurrentEditor } from "@tiptap/react";

import { FC, useMemo, useState } from "react";
import {
  Bold,
  ChevronsUpDown,
  Heading2,
  Italic,
  ListIcon,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={16} />
      </Toggle>
    </div>
  );
};

export default Toolbar;
