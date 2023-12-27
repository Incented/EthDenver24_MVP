import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";

interface TipTapProps {
  description: string;
  onChange: (richText: string) => void;
}

const TipTap: FC<TipTapProps> = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Color,
      TextStyle,
      Text,
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "min-h-[150px] p-2 text-gray-400",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col border-none justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        style={{
          outlineColor: "transparent",
          borderColor: "transparent",
          height: "100%",
        }}
      />
    </div>
  );
};

export default TipTap;
