import {
  Radio as RawRadio,
  RadioGroupProps as RawRadioGroupProps,
  RadioProps as RawRadioProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { radioStyles } from './styles.css';

export interface RadioProps extends Omit<RawRadioProps, 'color' | 'size'> {
  type?: 'radio';
}

export interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<RawRadioGroupProps, 'color' | 'size' | 'children'> {
  type?: 'radio-group';
  data: RadioGroupItemProps[];
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, ...rest } = props;

  return (
    <RawRadio
      ref={combinedRef}
      {...rest}
      className={classNames(radioStyles(), className)}
      size="md"
    />
  );
});

Radio.displayName = 'Radio';

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, data, disabled, orientation, ...rest } = props;

  return (
    <RawRadio.Group
      ref={combinedRef}
      {...rest}
      className={classNames(radioStyles({ orientation }), className)}
    >
      {data.map((datum, idx) => (
        <Radio
          {...datum}
          key={`${datum.value}-${idx}`}
          disabled={disabled || datum.disabled}
        />
      ))}
    </RawRadio.Group>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
