import { Loader } from '@mantine/core';
import { mantineColors } from 'common/styles/default-colors';
import { ButtonProps } from 'components/elements';
import { Button } from 'components/elements/button';
import * as React from 'react';

interface Props extends Omit<ButtonProps, 'disabled' | 'onClick' | 'leftIcon'> {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  icon: (size: number) => React.ReactNode;
  children: React.ReactNode;
  loaderColor?: string;
}

export default function LoadingButton(props: Props) {
  const { disabled, isLoading, icon, loaderColor, children, onClick, ...rest } =
    props;
  return (
    <Button
      {...rest}
      onClick={() => {
        !disabled && onClick?.();
      }}
      disabled={disabled || isLoading}
      leftIcon={(size) =>
        !isLoading ? (
          icon(size)
        ) : (
          <Loader color={loaderColor || mantineColors()} size={size} />
        )
      }
    >
      {children}
    </Button>
  );
}
