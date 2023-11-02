import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import MultiSelect, { MultiSelectProps } from '../multi-select';

export interface MultiSelectFieldProps extends MultiSelectProps {
  name: string;
  type: 'select-multi';
}

export default function MultiSelectField(props: MultiSelectFieldProps) {
  const { name, disabled, readOnly, onChange, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <MultiSelect
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
      onChange={(value) => {
        onChange?.(value);
        if (!onChange) {
          field.onChange(value);
        }
      }}
    />
  );
}
