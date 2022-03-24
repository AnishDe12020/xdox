import Editor from "./Editor";
import { Control, useController } from "react-hook-form";
import { Content } from "@tiptap/react";

interface IEditorFormComponentProps {
  control: Control<any, any>;
  defaultContent?: Content;
}

const EditorFormComponent = ({
  control,
  defaultContent
}: IEditorFormComponentProps): JSX.Element => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name: "content",
    control,
    rules: { required: true },
    defaultValue: defaultContent,
  });

  return (
    <Editor content={value} onChange={onChange} className="mt-16" ref={ref} />
  ) 
};

export default EditorFormComponent;
