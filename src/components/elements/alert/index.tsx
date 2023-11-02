import { Alert as RawAlert, AlertProps as RawAlertProps } from '@mantine/core';
import { AlertVariant } from '@mantine/core/lib/Alert/Alert.styles';
import { AlertIcon } from 'common/assets';
import React from 'react';

import { alertStyles } from './styles.css';

export interface AlertProps
  extends Omit<RawAlertProps, 'variant' | 'children'> {
  variant: 'default' | 'error' | 'warning' | 'success' | 'neutral';
  description: string;
}
type Style = {
  [key: string]: {
    variant: AlertVariant;
    color: string;
    iconColor?: string;
  };
};
const style: Style = {
  default: {
    color: 'blue',
    iconColor: 'white',
    variant: 'filled',
  },
  error: {
    color: 'red',
    variant: 'light',
  },
  warning: {
    color: 'orange',
    variant: 'light',
  },
  success: {
    color: 'teal',
    variant: 'light',
  },
  neutral: {
    color: 'gray',
    variant: 'light',
  },
};
const Alert = (props: AlertProps) => {
  const { variant, description, withCloseButton, ...rest } = props;
  const [isClose, setClose] = React.useState<boolean>(false);

  return (
    <>
      {!isClose && (
        <RawAlert
          {...rest}
          {...style[variant]}
          radius="md"
          withCloseButton={withCloseButton === undefined || withCloseButton}
          onClose={() => setClose(true)}
          icon={
            <AlertIcon
              color={style[variant]?.iconColor || style[variant].color}
              size={24}
            />
          }
          className={alertStyles[variant]}
          children={description}
        />
      )}
    </>
  );
};

export default Alert;
