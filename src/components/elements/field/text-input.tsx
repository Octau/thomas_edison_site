import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import TextInput, { TextInputProps } from '../text-input';

export interface TextInputFieldProps extends TextInputProps {
  name: string;
  type: 'text' | 'email' | 'tel';
}

export default function TextInputField(props: TextInputFieldProps) {
  const { name, disabled, readOnly, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <TextInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
