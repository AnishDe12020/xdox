import { FieldValues, UseFormRegister } from "react-hook-form";

interface IFormGroupProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  name: string;
  placeholder?: string;
  label?: string;
  id?: string;
}

const FormGroup = ({
  register,
  errors,
  name,
  placeholder,
  label,
  id,
}: IFormGroupProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      {label && (
        <label htmlFor={id || name} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        id={id || name}
        placeholder={placeholder}
        className="px-4 py-2 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 border-2 border-gray-700 hover:border-opacity-60 transition duration-200"
      />
      {errors[name] && (
        <p className="rounded-lg bg-red-600 px-3 py-2 text-xs italic w-full">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
