import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import DatePickerInput, { DatePickerInputProps } from '../date-picker';
import { FormContext } from '../form/context';

export interface DatePickerInputFieldProps extends DatePickerInputProps {
  name: string;
  type: 'date';
}

export default function DatePickerInputField(props: DatePickerInputFieldProps) {
  const {
    name,
    disabled,
    readOnly,
    required,
    allowDeselect = true,
    clearable = true,
    ...rest
  } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <DatePickerInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      clearable={clearable}
      disabled={_disabled}
      allowDeselect={allowDeselect}
      error={error}
    />
  );
}
