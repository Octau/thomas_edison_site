import {
  PasswordInput as RawPasswordInput,
  PasswordInputProps as RawPasswordInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { passwordInputStyles } from './styles.css';

export interface PasswordInputProps
  extends Omit<RawPasswordInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'password';
  noMargin?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const { className, rightSection, noMargin, type, ...rest } = props;

    return (
      <RawPasswordInput
        ref={combinedRef}
        {...rest}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          passwordInputStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
