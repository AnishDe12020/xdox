import { useForm } from "react-hook-form";
import FormGroup from "../FormGroup";
import Modal from "../Modal";
import Button from "../Button";
import { Editor } from "@tiptap/react";
import { Link2Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useCallback } from "react";

interface ILinkModalProps {
  editor: Editor;
}

const LinkModal = ({ editor }: ILinkModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      url: "",
    },
  });

  const setLink = useCallback(
    url => {
      if (url === null) {
        return;
      }

      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  const onSubmit = handleSubmit(async data => {
    setLink(data.url);
  });
  return (
    <Modal
      title="Add Link"
      closable
      trigger={
        <Button
          className={classNames(
            "transition-100 rounded-md !bg-secondary px-2 py-2 text-accent hover:!bg-primary hover:opacity-100"
          )}
          aria-label="Add Link"
          title="Add Link"
        >
          <Link2Icon className="h-4 w-4 text-accent" />
        </Button>
      }
      onDone={onSubmit}
      isSubmitting={isSubmitting}
      doneText="Submit"
    >
      <form onSubmit={onSubmit} className="flex flex-col space-y-8">
        <FormGroup
          register={register}
          errors={errors}
          name="url"
          label="URL"
          placeholder="https://google.com/"
        />
      </form>
    </Modal>
  );
};

export default LinkModal;
