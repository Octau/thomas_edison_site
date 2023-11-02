import {
  TextInput as RawTextInput,
  TextInputProps as RawTextInputProps,
} from '@mantine/core';
import classNames from 'classnames';
// import { CancelIcon } from 'common/assets';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { textInputStyles } from './styles.css';
// import { ActionIcon } from '../button';

export interface TextInputProps
  extends Omit<RawTextInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'text' | 'email' | 'tel';
  noMargin?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, rightSection, noMargin, ...rest } = props;

  //   const onClear = () => {
  //     if (window) {
  //       const nativeInputValueSetter = Object?.getOwnPropertyDescriptor?.(
  //         window.HTMLInputElement.prototype,
  //         'value',
  //       )?.set;
  //       nativeInputValueSetter?.call(combinedRef.current, '');

  //       const inputEvent = new Event('input', { bubbles: true });
  //       combinedRef.current.dispatchEvent(inputEvent);
  //     }
  //   };

  return (
    <RawTextInput
      ref={combinedRef}
      {...rest}
      rightSection={rightSection}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(textInputStyles, noMargin ? '' : 'mb16', className)}
      radius="md"
    />
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
