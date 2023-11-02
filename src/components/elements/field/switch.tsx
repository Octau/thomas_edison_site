import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import Switch, { SwitchProps } from '../switch';

export interface SwitchFieldProps extends SwitchProps {
  name: string;
  type: 'switch';
}

export default function SwitchField(props: SwitchFieldProps) {
  const { name, disabled, readOnly, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <Switch
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
