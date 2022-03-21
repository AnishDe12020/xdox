import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import lowlight from "lowlight";
import "highlight.js/styles/monokai.css";

interface IEditorProps {
  content?: Content;
  onChange: (content: Content) => void;
}

const Editor = ({ content, onChange }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg px-4 py-2 focus:outline-none text-accent prose-default bg-secondary rounded-lg m-6",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  console.log(content);

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
