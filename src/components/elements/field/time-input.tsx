import { ClockIcon } from 'common/assets';
import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import TimeInput, { TimeInputProps } from '../time-input';

export interface TimeInputFieldProps extends TimeInputProps {
  name: string;
  type: 'time';
}

export default function TimeInputField(props: TimeInputFieldProps) {
  const { name, disabled, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || disabled;
  const error = fieldState.error?.message;

  return (
    <TimeInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
      icon={<ClockIcon size={16} />}
    />
  );
}
