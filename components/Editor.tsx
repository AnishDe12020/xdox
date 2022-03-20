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
    content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `,
  });

  console.log(content);

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
