import {
  NumberInput as RawNumberInput,
  NumberInputProps as RawNumberInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { numberInputStyles } from './styles.css';

export interface NumberInputProps
  extends Omit<RawNumberInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'number';
  isMoneyFormat?: boolean;
  noMargin?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const {
      className,
      rightSection,
      isMoneyFormat,
      noMargin,
      precision = 2,
      ...rest
    } = props;

    return (
      <RawNumberInput
        ref={combinedRef}
        {...rest}
        precision={precision}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          numberInputStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
        {...(isMoneyFormat && {
          parser: (value) => (value || '').replace(/\$\s?|(,*)/g, ''),
          formatter: (value) =>
            !Number.isNaN(parseFloat(value || ''))
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '',
        })}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
