import { Modal } from '@mantine/core';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import { testPasswordConfirmation } from 'common/helpers/validation';
import colors from 'common/styles/colors';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/field';
import Form from 'components/elements/form/index';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

type FormType = {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
};

interface Props {
  onClose: () => void;
  onSubmit: (values) => void;
  type?: 'default' | 'employee';
}

export default function ChangePasswordModal(props: Props) {
  const { t } = useTranslation();
  const { onClose, type = 'default' } = props;

  const isDefault = type === 'default';

  const yupSchema = React.useMemo(
    () =>
      Yup.object()
        .shape({
          ...(isDefault && { oldPassword: Yup.string().required() }),
          password: Yup.string().required(),
          passwordConfirmation: testPasswordConfirmation(
            t,
            Yup.string().required(),
          ),
        })
        .required(),
    [isDefault, t],
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        await props.onSubmit(values);
      } catch (error) {
        if (error.errors) {
          formSetErrors(error.errors, methods.setError);
        }
        notification.error({ message: error.message });
      }
    },
    [methods.setError, props],
  );

  return (
    <Modal
      title={
        <Text textVariant="HeadingSmall">{t('user:change_password')}</Text>
      }
      size={500}
      closeButtonProps={{
        size: 20,
      }}
      centered
      opened
      onClose={onClose}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <Separator gap={32} />
        <div className={moduleStyles.container}>
          {isDefault && (
            <Input
              type="password"
              name="oldPassword"
              label={t('user:current_password')}
              placeholder={t('common:enter_extra', {
                extra: t('common:password'),
              })}
              required
            />
          )}
          <Input
            type="password"
            name="password"
            label={t('user:new_password')}
            placeholder={t('common:enter_extra', {
              extra: t('common:password'),
            })}
            required
          />
          <Input
            type="password"
            name="passwordConfirmation"
            label={t('user:password_confirmation')}
            placeholder={t('user:password_confirmation')}
            required
          />
          <Separator gap={16} />
          <Input type="submit" text={t('user:change_password')} />
          <Separator gap={16} />
          <Text
            align="center"
            color={colors.textWeak}
            textVariant="BodySmaller"
          >
            {t('modal:change_password_warning')}
          </Text>
        </div>
      </Form>
    </Modal>
  );
}
