import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import DateRangePicker, { DatePickerInputProps } from '../date-range-picker';
import { FormContext } from '../form/context';

export interface DateRangePickerFieldProps extends DatePickerInputProps {
  name: string;
  type: 'date-range';
}

export default function DateRangePickerField(props: DateRangePickerFieldProps) {
  const { name, disabled, readOnly, type, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <DateRangePicker
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      value={field.value.length === 0 ? undefined : field.value}
      disabled={_disabled}
      error={error}
    />
  );
}
