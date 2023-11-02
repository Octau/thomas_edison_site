import { CheckCircleIcon } from 'common/assets';
import isEmpty from 'lodash/isEmpty';
import useTranslation from 'next-translate/useTranslation';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import Button, { ButtonProps } from '../button/default';
import { FormContext } from '../form/context';

export interface ButtonFieldProps extends ButtonProps {
  type: 'submit';
  text?: string;
  hideIcon?: boolean;
}

export default function ButtonField(props: ButtonFieldProps) {
  const { t } = useTranslation();
  const { editable } = useContext(FormContext);
  const {
    disabled,
    text = t('common:save'),
    hideIcon,
    rightIcon,
    ...rest
  } = props;
  const {
    formState: { isSubmitting, errors },
  } = useFormContext();

  if (!editable && !isSubmitting) {
    return null;
  }
  const isValid = isEmpty(errors);
  const _disabled = disabled || !isValid || isSubmitting;

  return (
    <Button
      {...rest}
      disabled={_disabled}
      leftIcon={(size) =>
        !hideIcon ? <CheckCircleIcon size={size} /> : undefined
      }
    >
      {text ?? t('common:submit')}
    </Button>
  );
}
