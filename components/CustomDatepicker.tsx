import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";
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
        popperClassName="react-datepicker-left transition duration-200"
        name={rhfName}
        selected={value}
        onChange={onChange}
        ref={ref}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-lg text-accent">
              {DateTime.fromJSDate(date).toFormat("DDD")}
            </span>

            <div className="space-x-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex rounded-md bg-secondary p-1 text-sm font-medium text-gray-300 shadow-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-60
                                        `}
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-300" />
              </button>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                                                                        inline-flex rounded-md bg-secondary p-1 text-sm font-medium text-gray-300 shadow-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-60

                                        `}
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomDatepicker;
