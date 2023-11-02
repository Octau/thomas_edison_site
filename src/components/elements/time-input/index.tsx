import {
  TimeInput as RawTimeInput,
  TimeInputProps as RawTimeInputProps,
} from '@mantine/dates';
import classNames from 'classnames';
import { ClockIcon } from 'common/assets';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { timeInputStyles } from './styles.css';

export interface TimeInputProps
  extends Omit<
    RawTimeInputProps,
    'inputWrapperOrder' | 'type' | 'clearable' | 'format'
  > {
  type?: 'time';
  noMargin?: boolean;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, rightSection, defaultValue, noMargin, ...rest } = props;

  return (
    <RawTimeInput
      ref={combinedRef}
      {...rest}
      defaultValue={defaultValue}
      icon={<ClockIcon size={16} />}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(timeInputStyles, noMargin ? '' : 'mb16', className)}
      radius="md"
    />
  );
});

TimeInput.displayName = 'TimeInput';

export default TimeInput;
