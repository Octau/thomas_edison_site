import {
  Switch as RawSwitch,
  SwitchProps as RawSwitchProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { switchStyles } from './styles.css';

export interface SwitchProps extends Omit<RawSwitchProps, 'radius' | 'size'> {
  type?: 'switch';
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, ...rest } = props;

  return (
    <RawSwitch
      ref={combinedRef}
      {...rest}
      className={classNames(switchStyles, className)}
      radius="xs"
      size="md"
    />
  );
});

Switch.displayName = 'Switch';

export default Switch;
