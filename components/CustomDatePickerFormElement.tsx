import { Control, useController } from "react-hook-form";
import CustomDatepicker from "./CustomDatepicker";

interface ICustomDatepickerFormElementProps {
  name: string;
  control: Control;
}

const CustomDatepickerFormElement = ({
  name,
  control,
}: ICustomDatepickerFormElementProps): JSX.Element => {
  const {
    field: { onChange, name: rhfName, value, ref },
  } = useController({
    control,
    name,
    defaultValue: new Date(),
  });

  return (
    <div className="relative">
      <CustomDatepicker
        name={rhfName}
        selected={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
};

export default CustomDatepickerFormElement;
