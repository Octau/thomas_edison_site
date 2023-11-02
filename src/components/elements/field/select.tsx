import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import Select, { OptionProps, SelectProps } from '../select';

export interface SelectFieldProps extends SelectProps {
  name: string;
  type: 'select';
  onAfterChange?: (value?: OptionProps) => void;
  noMargin?: boolean;
}

export default function SelectField(props: SelectFieldProps) {
  const {
    name,
    disabled,
    readOnly,
    onAfterChange,
    onChange,
    required,
    ...rest
  } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <Select
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
      onChange={(value) => {
        onChange?.(value);
        if (!onChange) {
          field.onChange(value);
          if (onAfterChange) {
            const found = rest.data.find((curr) => {
              if (typeof curr === 'string') {
                return curr === value;
              }
              return curr.value === value;
            }) as OptionProps;
            onAfterChange(found);
          }
        }
      }}
    />
  );
}
