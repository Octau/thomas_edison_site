import {
  Textarea as RawTextarea,
  TextareaProps as RawTextareaProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { textareaInputStyles } from './style.css';

export interface TextareaInputProps
  extends Omit<RawTextareaProps, 'inputWrapperOrder'> {
  noMargin?: boolean;
}

const TextareaInput = forwardRef<HTMLInputElement, TextareaInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const { className, rightSection, noMargin, ...rest } = props;

    return (
      <RawTextarea
        ref={combinedRef}
        {...rest}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          textareaInputStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
      />
    );
  },
);

TextareaInput.displayName = 'TextInput';

export default TextareaInput;
