import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface IEditorProps {
  content?: Content;
  onChange: (content: Content) => void;
}

const Editor = ({ content, onChange }: IEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg px-4 py-2 focus:outline-none text-accent prose-default bg-secondary rounded-lg m-6",
      },
    },
    content,
  });

  return <EditorContent editor={editor} onChange={onChange} />;
};

export default Editor;
