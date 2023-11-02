import {
  Checkbox as RawCheckbox,
  CheckboxProps as RawCheckboxProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { checkboxStyles, marginBottom } from './styles.css';

export interface CheckboxProps extends Omit<RawCheckboxProps, 'size'> {
  type?: 'checkbox';
  withMarginBottom?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, withMarginBottom = false, ...rest } = props;

  return (
    <RawCheckbox
      ref={combinedRef}
      {...rest}
      className={classNames(
        checkboxStyles,
        className,
        withMarginBottom && marginBottom,
      )}
      size="md"
    />
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
