import ReactDatePicker from "react-datepicker";
import { Control, useController } from "react-hook-form";

interface ICustomDatepickerProps {
  name: string;
  control: Control;
}

const CustomDatepicker = ({
  name,
  control,
}: ICustomDatepickerProps): JSX.Element => {
  const {
    field: { onChange, name: rhfName, value, ref },
  } = useController({ control, name });

  return (
    <div className="relative">
      <ReactDatePicker
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        popperClassName="react-datepicker-left"
        name={rhfName}
        selected={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
};

export default CustomDatepicker;
