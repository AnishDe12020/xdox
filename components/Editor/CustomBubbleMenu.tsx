import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";
import { BubbleMenu, Editor } from "@tiptap/react";
import classNames from "classnames";
import { cloneElement } from "react";
import Button from "../Button";

interface ICustomBubbleMenu {
  editor: Editor;
}

const CustomBubbleMenu = ({ editor }: ICustomBubbleMenu): JSX.Element => {
  const items = [
    {
      icon: <FontBoldIcon />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <FontItalicIcon />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <StrikethroughIcon />,
      title: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <CodeIcon />,
      title: "Inline Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 200 }}
      className="flex items-center justify-center space-x-2 rounded-lg bg-secondary p-2 shadow-lg"
    >
      {items.map(({ icon, title, action, isActive }, index) => (
        <Button
          key={index}
          onClick={action}
          className={classNames(
            "transition-100 rounded-md !bg-secondary px-2 py-2 text-accent hover:!bg-primary hover:opacity-100",
            isActive && "bg-primary"
          )}
          aria-label={title}
          title={title}
        >
          {icon && cloneElement(icon, { className: "h-4 w-4 text-accent" })}
        </Button>
      ))}
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
