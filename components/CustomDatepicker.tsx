import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";
import { createRef, forwardRef, Ref } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

interface ICustomDatepickerProps extends ReactDatePickerProps {
  ref: Ref<HTMLInputElement>;
}

const CustomInput = forwardRef<HTMLInputElement>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="rounded-lg border-4 border-gray-900 bg-secondary px-4 py-2 transition duration-200 hover:border-opacity-60 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
  />
));

CustomInput.displayName = "CustomInput";

const CustomDatepicker = ({ ref, ...otherProps }: ICustomDatepickerProps) => {
  return (
    <div className="relative">
      <ReactDatePicker
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        popperClassName="react-datepicker-left transition duration-200"
        {...otherProps}
        customInput={<CustomInput ref={ref} />}
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
                                            inline-flex rounded-lg bg-secondary p-1 text-sm font-medium text-gray-300 shadow-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-60
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
                                                                                        inline-flex rounded-lg bg-secondary p-1 text-sm font-medium text-gray-300 shadow-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-60

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

CustomDatepicker.displayName = "CustomDatepicker";

export default CustomDatepicker;
