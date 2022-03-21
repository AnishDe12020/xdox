import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  ListBulletIcon,
  PilcrowIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import classNames from "classnames";
import { cloneElement } from "react";
import Button from "../Button";
import { Heading1, Heading2, OrderedList, TaskList } from "../Icons";

interface IMenuBarProps {
  editor: Editor;
}

const MenuBar = ({ editor }: IMenuBarProps): JSX.Element => {
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
    { type: "separator" },
    {
      icon: <Heading1 />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <PilcrowIcon />,
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
    {
      icon: <ListBulletIcon />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <OrderedList />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <TaskList />,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: editor.isActive("taskList"),
    },
  ];
  return (
    <div className="mx-4 flex items-center space-x-2 rounded-lg bg-secondary px-4 py-2">
      {items.map(({ icon, title, action, isActive, type }, index) =>
        type === "separator" ? (
          <div
            key={index}
            className="!mx-4 h-5 w-[2px] rounded-sm bg-gray-500 opacity-80"
          />
        ) : (
          <Button
            key={index}
            onClick={action}
            className={classNames(
              "transition-100 rounded-md bg-secondary px-2 py-2 text-accent hover:bg-primary hover:opacity-100",
              isActive && "bg-primary"
            )}
            aria-label={title}
            title={title}
          >
            {icon && cloneElement(icon, { className: "h-4 w-4 text-accent" })}
          </Button>
        )
      )}
    </div>
  );
};

export default MenuBar;
