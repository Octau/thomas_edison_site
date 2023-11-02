import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import PasswordInput, { PasswordInputProps } from '../password-input';

export interface PasswordInputFieldProps extends PasswordInputProps {
  name: string;
  type: 'password';
}

export default function PasswordInputField(props: PasswordInputFieldProps) {
  const { name, disabled, readOnly, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <PasswordInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
