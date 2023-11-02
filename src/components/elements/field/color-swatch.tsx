import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import ColorSwatch, { ColorSwatchProps } from '../color-swatch';
import { FormContext } from '../form/context';

export interface ColorSwatchFieldProps extends ColorSwatchProps {
  name: string;
  type: 'color-swatch';
}

export default function ColorSwatchField(props: ColorSwatchFieldProps) {
  const { name, disabled, readOnly, required, ...rest } = props;
  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name });

  const _disabled = !context.editable || readOnly || disabled;
  const error = fieldState.error?.message;

  return (
    <ColorSwatch
      {...rest}
      {...field}
      {...(!_disabled && { required })}
      disabled={_disabled}
      error={error}
    />
  );
}
