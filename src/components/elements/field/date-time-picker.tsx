import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import DateTimePicker, { DateTimePickerProps } from '../date-time-picker';
import { FormContext } from '../form/context';

export interface DateTimePickerFieldProps extends DateTimePickerProps {
  name: string;
  type: 'date-time';
}

export default function DateTimePickerField(props: DateTimePickerFieldProps) {
  const { name, disabled, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || disabled;
  const error = fieldState.error?.message;

  return (
    <DateTimePicker
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
