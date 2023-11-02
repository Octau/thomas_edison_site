import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import NumberInput, { NumberInputProps } from '../number-input';

export interface NumberInputFieldProps extends Omit<NumberInputProps, 'value'> {
  name: string;
  type: 'number';
  onAfterChange?: (val?: number) => void;
}
export type MoneyInputFieldProps = Omit<
  NumberInputFieldProps,
  'isMoneyFormat' | 'precision' | 'hideControls' | 'type'
> & {
  type: 'money';
};

export default function NumberInputField(props: NumberInputFieldProps) {
  const {
    name,
    disabled,
    readOnly,
    type,
    onAfterChange,
    required,
    precision,
    ...rest
  } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;
  const _precision = precision || 0;

  return (
    <NumberInput
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      onChange={(val) => {
        field.onChange(val);
        onAfterChange?.(val || undefined);
      }}
      precision={_precision}
      disabled={_disabled}
      error={error}
    />
  );
}
