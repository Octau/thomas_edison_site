import {
  Select as RawSelect,
  SelectProps as RawSelectProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { noMarginSelect, selectStyles } from './styles.css';

export type { SelectItem as OptionProps } from '@mantine/core';

export interface SelectProps
  extends Omit<RawSelectProps, 'inputWrapperOrder' | 'type'> {
  type?: 'select';
  noMargin?: boolean;
}

const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, noMargin, ...rest } = props;

  return (
    <RawSelect
      ref={combinedRef}
      {...rest}
      transitionProps={{
        duration: 150,
        transition: 'pop',
        timingFunction: 'ease',
      }}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(
        selectStyles,
        className,
        noMargin && noMarginSelect,
      )}
      radius="md"
    />
  );
});

Select.displayName = 'Select';

export default Select;
