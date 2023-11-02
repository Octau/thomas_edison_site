import {
  ActionIcon as RawActionIcon,
  ActionIconProps as RawActionIconProps,
} from '@mantine/core';
import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { actionButtonStyles } from './styles.css';

export interface ActionIconProps
  extends Omit<RawActionIconProps, 'children' | 'size' | 'radius'>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> {
  size?: 'default' | 'small';
  children: (size: number) => React.ReactNode;
}

const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (props, ref) => {
    const {
      size = 'default',
      className,
      children: _children,
      color = 'blue',
      variant = 'filled',
      ...rest
    } = props;

    const children = _children(size === 'default' ? 20 : 16);

    return (
      <RawActionIcon
        ref={ref}
        {...rest}
        color={color}
        variant={variant}
        className={classNames(actionButtonStyles({}), className)}
        children={children}
        size={size === 'default' ? 36 : 28}
        radius="xl"
      />
    );
  },
);

ActionIcon.displayName = 'ActionIcon';

export default ActionIcon;
