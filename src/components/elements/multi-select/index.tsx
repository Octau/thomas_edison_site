import {
  MultiSelect as RawMultiSelect,
  MultiSelectProps as RawMultiSelectProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { multiSelectStyles } from './styles.css';
import Badge from '../badge';

export type { SelectItem as MultiOptionProps } from '@mantine/core';

export interface MultiSelectProps
  extends Omit<RawMultiSelectProps, 'inputWrapperOrder' | 'type'> {
  type?: 'select-multi';
  noMargin?: boolean;
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const { className, noMargin, ...rest } = props;

    return (
      <RawMultiSelect
        ref={combinedRef}
        {...rest}
        transitionProps={{
          duration: 150,
          transition: 'pop',
          timingFunction: 'ease',
        }}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(
          multiSelectStyles,
          noMargin ? '' : 'mb16',
          className,
        )}
        radius="md"
        valueComponent={({ value, label, color, onRemove }) => (
          <Badge
            key={value}
            onClear={rest.disabled ? null : onRemove}
            badgeType="tagging"
            color={color || 'blue'}
            style={{
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            {label}
          </Badge>
        )}
      />
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
