"use client";

import { EditorContent, generateJSON, useEditor } from "@tiptap/react";
import Toolbar from "./Toolbar";
import { TiptapExtensions } from "./extensions";
import { TiptapEditorProps } from "./props";

interface TipTapProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function TipTap({ value, onChange, onBlur }: TipTapProps) {
  const editor = useEditor({
    extensions: TiptapExtensions,
    content: generateJSON(value, TiptapExtensions),
    editorProps: TiptapEditorProps,
    autofocus: "end",
    onUpdate(e) {
      onChange(e.editor.getHTML());
    },
    onBlur,
  });
  return (
    <div
      className="flex flex-col border-none justify-stretch"
      onClick={() => {
        editor?.chain().focus().run();
      }}
    >
      {/* {editor && <EditorBubbleMenu editor={editor} />} */}
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
