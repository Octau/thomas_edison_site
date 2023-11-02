import { UserModel, UserCreateMutationInput } from 'api-hooks/user/model';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import { testPasswordConfirmation } from 'common/helpers/validation';
import FormContent from 'components/common/form-content';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/field';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface Props {
  renderError?: React.ReactNode;
  user?: UserModel;
  onSubmit: (
    input: UserCreateMutationInput,
    form: ReturnType<typeof useForm>,
  ) => Promise<any | undefined>;
}

export default function UserForm(props: Props) {
  const { t } = useTranslation();
  const { user } = props;

  const defaultValues = React.useMemo<UserCreateMutationInput>(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
      password: user ? undefined : '',
      passwordConfirmation: user ? undefined : '',
    }),
    [user],
  );

  const resolver = useYupValidationResolver(
    Yup.object()
      .shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: !user
          ? Yup.string().required().min(8)
          : Yup.string().nullable(),
        passwordConfirmation: !user
          ? testPasswordConfirmation(t, Yup.string().required().min(6))
          : testPasswordConfirmation(t, Yup.string().nullable()),
        // isActive: Yup.bool(),
      })
      .required(),
  );

  const methods = useForm<UserCreateMutationInput>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (values: UserCreateMutationInput) => {
    try {
      await props.onSubmit(values, methods as any);
    } catch (error) {
      if (error.errors) {
        formSetErrors(error.errors, methods.setError);
      }
      notification.error({ message: error.message });
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormContent>
        <div className={moduleStyles.fullContainer}>
          <Input
            type="text"
            name="name"
            label={t('common:name')}
            placeholder={t('common:name')}
            required
          />
          <Input
            type="email"
            name="email"
            label={t('common:email')}
            placeholder={t('common:email')}
            required
          />
          <Input
            type="password"
            name="password"
            label={t('common:password')}
            placeholder={t('common:password')}
            required={!user}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            label={t('common:password_confirmation')}
            placeholder={t('common:password_confirmation')}
            required={!user}
          />
          <Separator gap={16} />
          <Input type="submit" />
        </div>
      </FormContent>
    </Form>
  );
}
