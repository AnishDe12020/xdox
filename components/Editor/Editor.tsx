import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import lowlight from "lowlight";
import "highlight.js/styles/monokai.css";
import MenuBar from "./MenuBar";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CustomBubbleMenu from "./CustomBubbleMenu";
import Typography from "@tiptap/extension-typography";
import classNames from "classnames";

interface IEditorProps {
  content?: Content;
  onChange: (content: Content) => void;
  className?: string;
}

const Editor = ({ content, onChange, className }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Link,
      Image,
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg px-6 pt-4 py-6 focus:outline-none text-accent prose-default bg-secondary rounded-b-lg w-full !max-w-full",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  console.log(content);

  return (
  <div className={classNames("flex flex-col justify-center", className)}>
      {editor && <MenuBar editor={editor} />}
      {editor && <CustomBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
