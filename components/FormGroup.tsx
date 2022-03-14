import { UseFormRegister } from "react-hook-form";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import classNames from "classnames";

interface IFormGroupProps {
  register: UseFormRegister<any>;
  errors: {
    [x: string]: any;
  };
  name: string;
  placeholder?: string;
  label?: string;
  id?: string;
  textarea?: boolean;
  isSwitch?: boolean;
  checked?: boolean;
}

const FormGroup = ({
  register,
  errors,
  name,
  placeholder,
  label,
  id,
  textarea,
  isSwitch,
  checked,
}: IFormGroupProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      {label && (
        <label htmlFor={id || name} className="text-sm font-semibold">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          {...register(name)}
          id={id || name}
          placeholder={placeholder}
          className="h-24 resize-y rounded-lg border-4 border-gray-900 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
        />
      ) : isSwitch ? (
        <SwitchPrimitive.Root
          className={classNames(
            "group radix-state-checked:bg-blue-500 radix-state-unchecked:bg-secondary",
            "border-2 border-primary px-[0.25rem]",
            "relative inline-flex h-[30px] w-[48px] flex-shrink-0 cursor-pointer items-center rounded-full",
            "transition duration-200 ease-in-out",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
          )}
          {...register(name)}
          id={id || name}
          defaultChecked={checked}
        >
          <SwitchPrimitive.Thumb
            className={classNames(
              "group-radix-state-checked:translate-x-[1.075rem] group-radix-state-unchecked:translate-x-0",
              "pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-accent shadow-lg ring-0 transition duration-200 ease-in-out"
            )}
          />
        </SwitchPrimitive.Root>
      ) : (
        <input
          {...register(name)}
          id={id || name}
          placeholder={placeholder}
          className="rounded-lg border-4 border-gray-900 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
        />
      )}
      {errors[name] && (
        <p className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs italic">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
