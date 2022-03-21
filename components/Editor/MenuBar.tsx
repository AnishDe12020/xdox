import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import classNames from "classnames";
import { cloneElement } from "react";
import Button from "../Button";

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
    { type: "separator" },
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
            {icon && cloneElement(icon, { className: "h-4 w-4" })}
          </Button>
        )
      )}
    </div>
  );
};

export default MenuBar;
