import {
  ActionIcon,
  Badge as RawBadge,
  BadgeProps as RawBadgeProps,
} from '@mantine/core';
import classNames from 'classnames';
import { CancelIcon } from 'common/assets';
import useCombinedRefs from 'hooks/use-combined-refs';
import { MouseEventHandler, forwardRef, useRef } from 'react';

import { badgeStyles } from './styles.css';

export interface BadgeProps extends Omit<RawBadgeProps, 'rightSection'> {
  onClear?: (() => void) | null;
  badgeType?: 'pill' | 'tagging';
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    onClear,
    badgeType = 'pill',
    color,
    size = 'md',
    radius = 'sm',
    ...rest
  } = props;

  const removeButton = (
    <ActionIcon
      color={color}
      size="xs"
      {...(props.onClear && { onClick: props.onClear })}
    >
      <CancelIcon size={12} />
    </ActionIcon>
  );

  return (
    <RawBadge
      ref={combinedRef}
      {...rest}
      color={color}
      className={classNames(badgeStyles, className)}
      radius={badgeType === 'tagging' ? 'sm' : radius}
      size={size}
      sx={onClear ? { paddingRight: 3 } : undefined}
      rightSection={onClear ? removeButton : undefined}
    />
  );
});

Badge.displayName = 'Badge';

export default Badge;
