import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import Checkbox, { CheckboxProps } from '../checkbox';
import { FormContext } from '../form/context';

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  type: 'checkbox';
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { name, disabled, readOnly, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <Checkbox
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      checked={field.value}
      disabled={_disabled}
      error={error}
    />
  );
}
