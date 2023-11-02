import {
  Button as RawButton,
  ButtonProps as RawButtonProps,
} from '@mantine/core';
import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { buttonStyles } from './styles.css';

export interface ButtonProps
  extends Omit<
      RawButtonProps,
      'variant' | 'size' | 'leftIcon' | 'rightIcon' | 'radius'
    >,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'small';
  leftIcon?: (size: number) => React.ReactNode;
  rightIcon?: (size: number) => React.ReactNode;
  error?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'default',
    type = 'button',
    size = 'default',
    leftIcon: _leftIcon,
    rightIcon: _rightIcon,
    className,
    error: isError,
    ...rest
  } = props;
  const _variant =
    variant === 'default'
      ? 'filled'
      : variant === 'secondary'
      ? 'outline'
      : 'white';

  const leftIcon = () => _leftIcon?.(size === 'default' ? 20 : 16) || null;
  const rightIcon = () => _rightIcon?.(size === 'default' ? 20 : 16) || null;

  return (
    <RawButton
      {...rest}
      ref={ref}
      variant={_variant}
      type={type}
      className={classNames(
        buttonStyles({
          size,
          error: isError ? _variant : 'none',
          default: isError ? 'none' : _variant,
        }),
        className,
      )}
      leftIcon={leftIcon()}
      rightIcon={rightIcon()}
      radius="xl"
    />
  );
});

Button.displayName = 'Button';

export default Button;
