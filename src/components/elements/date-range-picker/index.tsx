import {
  DatesRangeValue,
  DatePickerInput as RawDatePickerInput,
  DatePickerInputProps as RawDatePickerInputProps,
} from '@mantine/dates';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { dateRangePickerStyles } from './styles.css';

export interface DatePickerInputProps
  extends Omit<
    RawDatePickerInputProps,
    | 'inputWrapperOrder'
    | 'type'
    | 'format'
    | 'inputFormat'
    | 'labelFormat'
    | 'firstDayOfWeek'
    | 'radius'
    | 'dayClassname'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'allowDeselect'
  > {
  type?: 'date-range';
  noMargin?: boolean;
  value?: [Date | null, Date | null];
  defaultValue?: [Date | null, Date | null];
  onChange?: (value: DatesRangeValue) => void;
}

const DateRangePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const { className, rightSection, type, noMargin, ...rest } = props;

    return (
      <RawDatePickerInput
        ref={combinedRef}
        {...rest}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          dateRangePickerStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
        firstDayOfWeek={0}
        type="range"
        valueFormat="DD MMM YYYY"
      />
    );
  },
);

DateRangePickerInput.displayName = 'DateRangePickerInput';

export default DateRangePickerInput;
