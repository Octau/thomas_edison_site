import React, { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form';
import TextareaInput, { TextareaInputProps } from '../text-area-input';

export interface TextareaInputFieldProps extends TextareaInputProps {
  name: string;
  type: 'text-area';
}

export default function TextareaInputField(props: TextareaInputFieldProps) {
  const { name, disabled, readOnly, minRows = 4, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <TextareaInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      minRows={minRows}
      disabled={_disabled}
      error={error}
    />
  );
}
