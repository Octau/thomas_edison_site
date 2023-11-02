import {
  DateTimePicker as RawDateTimePicker,
  DateTimePickerProps as RawDateTimePickerProps,
} from '@mantine/dates';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { dateTimePickerStyles } from './styles.css';

export interface DateTimePickerProps extends RawDateTimePickerProps {
  type?: 'date-time';
  noMargin?: boolean;
  label?: string;
  description?: React.ReactNode;
}

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const { className, type, noMargin, description, ...rest } = props;

    return (
      <RawDateTimePicker
        ref={combinedRef}
        {...rest}
        className={classNames(
          dateTimePickerStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        valueFormat="DD MMM YYYY, HH:mm"
        radius="md"
      />
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
