import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
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
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <FontItalicIcon />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    { type: "separator" },
  ];
  return (
    <div>
      <p>hi</p>
      {items.map((item, index) => 
        item.type === "separator" ? (
          <div key={index} className="separator" />
        ) : (
          <Button key={index} onClick={item.action}>
            {item.icon}
          </Button>
        )
     )}
    </div>
  );
};

export default MenuBar;
