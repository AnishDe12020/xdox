import * as SwitchPrimitive from "@radix-ui/react-switch";
import classNames from "classnames";

interface ISwitchProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
  name?: string;
}

const Switch = ({ checked, onChange, id, name }: ISwitchProps): JSX.Element => {
  return (
    <SwitchPrimitive.Root
      className={classNames(
        "group radix-state-checked:bg-blue-500 radix-state-unchecked:bg-secondary",
        "border-2 border-primary px-[0.25rem]",
        "relative inline-flex h-[30px] w-[48px] flex-shrink-0 cursor-pointer items-center rounded-full",
        "transition duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
      )}
      checked={checked}
      onClick={onChange}
      id={id}
      name={name}
    >
      <SwitchPrimitive.Thumb
        className={classNames(
          "group-radix-state-checked:translate-x-[1.075rem] group-radix-state-unchecked:translate-x-0",
          "pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-accent shadow-lg ring-0 transition duration-200 ease-in-out"
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
