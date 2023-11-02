import {
  CheckIcon,
  ColorSwatch as RawColorSwatch,
  useMantineTheme,
  ColorSwatchProps as RawColorSwatchProps,
  DefaultMantineColor,
  Group,
} from '@mantine/core';
import colors from 'common/styles/colors';
import { useState } from 'react';

import FormControl, { FormControlProps } from '../form-control';

export interface ColorSwatchProps
  extends Omit<RawColorSwatchProps, 'onClick' | 'color'>,
    Omit<FormControlProps, 'onClick' | 'children'> {
  value?: DefaultMantineColor;
  onChange?: (value: DefaultMantineColor) => void;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  maxWidth?: number;
}

export default function ColorSwatch(props: ColorSwatchProps) {
  const {
    value,
    onChange,
    radius = 'xs',
    disabled,
    readOnly,
    required,
    label,
    hideLabel,
    error,
    noMargin,
    name,
    maxWidth,
    ...rest
  } = props;
  const [selected, setSelected] = useState<DefaultMantineColor | undefined>();
  const theme = useMantineTheme();
  const _disabled = disabled || readOnly;

  const swatches = Object.keys(theme.colors).map(
    (color: DefaultMantineColor) => (
      <RawColorSwatch
        {...rest}
        key={color}
        color={theme.colors[color][6]}
        radius={radius}
        onClick={() => {
          if (!_disabled) {
            if (onChange) {
              onChange(color);
            } else {
              setSelected(color);
            }
          }
        }}
        style={{ cursor: !disabled ? 'pointer' : 'not-allowed' }}
      >
        {color === (value || selected) && (
          <CheckIcon width={12} color={colors.white} />
        )}
      </RawColorSwatch>
    ),
  );

  return (
    <FormControl {...{ required, label, hideLabel, error, noMargin }}>
      <Group spacing="xs" style={{ opacity: _disabled ? 0.5 : 1, maxWidth }}>
        {swatches}
      </Group>
    </FormControl>
  );
}
