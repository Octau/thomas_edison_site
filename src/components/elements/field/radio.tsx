import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import RadioGroup, { RadioGroupProps } from '../radio';

export interface RadioGroupFieldProps extends RadioGroupProps {
  name: string;
  type: 'radio-group';
}

export default function RadioGroupField(props: RadioGroupFieldProps) {
  const { name, disabled, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || disabled;
  const error = fieldState.error?.message;

  return (
    <RadioGroup
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
