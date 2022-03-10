import { UseFormRegister } from "react-hook-form";

interface IFormGroupProps {
  register: UseFormRegister<any>;
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
        className="rounded-lg border-2 border-gray-700 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
      />
      {errors[name] && (
        <p className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs italic">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
