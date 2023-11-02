import {
  DatePickerInput as RawDatePickerInput,
  DatePickerInputProps as RawDatePickerInputProps,
} from '@mantine/dates';
import classNames from 'classnames';
import { CalendarIcon } from 'common/assets';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { datePickerStyles } from './styles.css';

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
  > {
  type?: 'date';
  noMargin?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const {
      className,
      rightSection,
      defaultValue = new Date(),
      type,
      noMargin,
      ...rest
    } = props;

    return (
      <RawDatePickerInput
        ref={combinedRef}
        {...rest}
        defaultValue={defaultValue}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          datePickerStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
        firstDayOfWeek={0}
        valueFormat="DD MMM YYYY"
        icon={<CalendarIcon size={16} />}
      />
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
