import { useLogin } from 'api-hooks/auth';
import classNames from 'classnames';
import config from 'common/config';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/field';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import { useKY } from 'hooks/use-ky';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { loginStyles } from './styles.css';

type LoginFormType = {
  email?: string;
  password?: string;
};

export default function Login() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { mutateAsync } = useLogin();
  const { setCredential } = useKY();

  const resolver = useYupValidationResolver(
    Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
  );

  const methods = useForm<LoginFormType>({
    resolver,
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const result = await mutateAsync(values);
        setCredential(result.data);

        await localStorage.setItem(
          config.authSession,
          JSON.stringify(result.data),
        );

        global.refreshToken = result?.data?.refreshToken;
        push('/home');
      } catch (e: any) {
        if (e.errors) {
          formSetErrors(e.errors, methods.setError);
        }
        notification.error({ message: e?.message });
      }
    },
    [methods.setError, mutateAsync, push, setCredential],
  );

  return (
    <>
      <Head>
        <title>{t('common:login')}</title>
      </Head>
      <div className={classNames(loginStyles.container, 'row')}>
        <div className={loginStyles.contentContainer}>
          <div className={loginStyles.card}>
            <Text textVariant="HeadingLarge">{t('common:login')}</Text>
            <Separator gap={24} />
            <Form methods={methods} onSubmit={onSubmit}>
              <div className={loginStyles.contentBody}>
                <div>
                  <Input
                    label={t('common:email')}
                    name="email"
                    type="text"
                    required
                  />
                  <Input
                    label={t('common:password')}
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div>
                <div className={loginStyles.actionContainer}>
                  <Input
                    text={t('common:login')}
                    hideIcon
                    type="submit"
                    className={loginStyles.submitButton}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
