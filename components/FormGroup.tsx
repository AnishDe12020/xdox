import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import Switch from "./Switch";

interface IFormGroupProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  placeholder?: string;
  label?: string;
  id?: string;
  textarea?: boolean;
  isSwitch?: boolean;
  checked?: boolean;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  control?: Control<any>;
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
  type,
  required,
  control,
}: IFormGroupProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col justify-center space-y-2">
        {label && (
          <label
            htmlFor={id || name}
            className="relative w-fit pr-4 text-sm font-semibold"
          >
            {label}
            {required && (
              <span className="absolute right-0 top-0 text-lg text-red-500">
                *
              </span>
            )}
          </label>
        )}
        {textarea ? (
          <textarea
            {...register(name)}
            id={id || name}
            placeholder={placeholder}
            className="h-24 resize-y rounded-lg border-4 border-gray-900 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
            required={required}
          />
        ) : isSwitch ? (
          <Switch
            name={name}
            checked={checked as boolean}
            control={control as Control}
          />
        ) : (
          <input
            {...register(name)}
            id={id || name}
            placeholder={placeholder}
            className="rounded-lg border-4 border-gray-900 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
            type={type}
            required={required}
          />
        )}
        {errors[name] && (
          <p className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs italic">
            {errors[name].message}
          </p>
        )}
      </div>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            margin: 0;
            -webkit-appearance: none;
          }
        `}
      </style>
    </>
  );
};

export default FormGroup;
