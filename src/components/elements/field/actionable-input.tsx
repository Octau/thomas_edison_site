import { Loader } from '@mantine/core';
import { CheckCircleIcon, AlertIcon } from 'common/assets';
import colors from 'common/styles/colors';
import Separator from 'components/common/separator';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import React, { useContext } from 'react';
import {
  ControllerRenderProps,
  useController,
  useFormContext,
} from 'react-hook-form';

import { Button } from '../button';
import { FormContext } from '../form';

interface ActionableInputProps<T> {
  // The name of the field itself
  name: string;
  // The name where the result from action is stored.
  resultName: string;
  action: (value: string) => Promise<T>;
  disabled?: boolean;

  builder: (
    field: ControllerRenderProps<any, string>,
    error: string | undefined,
    rightSection: React.ReactNode,
  ) => React.ReactElement;

  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function ActionableInput<T>(props: ActionableInputProps<T>) {
  const { name, action, resultName, disabled, builder, buttonRef } = props;
  const { t } = useTranslation();
  const { editable } = useContext(FormContext);

  const { setValue, setError, clearErrors, control, trigger } =
    useFormContext<any>();
  const { field: sourceField, fieldState: sourceFieldState } = useController({
    name,
    control,
  });
  const { field: resultField, fieldState: resultFieldState } = useController({
    name: resultName,
    control,
  });

  const [loading, setLoading] = React.useState(false);
  const handleAction = React.useCallback(async () => {
    if (!(await trigger(name))) return;
    setLoading(true);
    try {
      const result = await action(sourceField.value);
      setValue(resultName, result);
      clearErrors([name, resultName]);
    } catch (e) {
      if (e.message) setError(name, { message: e.message });
      else setError(name, { message: e.toString() });
      setValue(resultName, undefined);
    }
    setLoading(false);
  }, [
    action,
    clearErrors,
    name,
    resultName,
    setError,
    setValue,
    sourceField.value,
    trigger,
  ]);

  const error = React.useMemo(
    () => sourceFieldState.error || resultFieldState.error,
    [resultFieldState.error, sourceFieldState.error],
  );

  React.useEffect(() => {
    setValue(resultName, null);
  }, [resultName, setValue, sourceField.value]);

  return builder(
    sourceField,
    error?.message,
    <div
      className={moduleStyles.row({ justify: 'end' })}
      style={{
        marginRight: '42px',
      }}
    >
      {loading && <Loader color="blue" size={16} />}
      {error && !loading && <AlertIcon size={16} color={colors.error} />}
      {resultField.value && !error && !loading && (
        <CheckCircleIcon size={16} color={colors.textSuccess} />
      )}
      <Separator gap={8} direction="horizontal" />
      <Button
        variant="tertiary"
        disabled={disabled || loading || !editable}
        onClick={handleAction}
        style={{
          ...buttonStyle,
        }}
        ref={buttonRef}
      >
        {t('common:apply')}
      </Button>
    </div>,
  );
}

const buttonStyle = {
  background: 'transparent',
  padding: 0,
};
