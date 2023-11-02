import { CustomerModel, CustomerMutationInput } from 'api-hooks/customer/model';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import regex from 'common/utils/regex';
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
  customer?: CustomerModel;
  onSubmit: (
    input: CustomerMutationInput,
    form: ReturnType<typeof useForm>,
  ) => Promise<any | undefined>;
}

export default function CustomerForm(props: Props) {
  const { t } = useTranslation();
  const { customer } = props;

  const defaultValues = React.useMemo<CustomerMutationInput>(
    () => ({
      name: customer?.name || '',
      address: customer?.address || '',
      phone: customer?.phone || '',
    }),
    [customer],
  );

  const resolver = useYupValidationResolver(
    Yup.object()
      .shape({
        name: Yup.string().required(),
        phone: Yup.string()
          .matches(regex.phone, t('error:phone_validation'))
          .min(9)
          .required(),
        address: Yup.string().required(),
      })
      .required(),
  );

  const methods = useForm<CustomerMutationInput>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (values: CustomerMutationInput) => {
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
            type="text"
            name="address"
            label={t('common:address')}
            placeholder={t('common:address')}
            required
          />
          <Input
            type="tel"
            name="phone"
            label={t('common:phone')}
            placeholder={t('common:phone')}
            required
          />
          <Separator gap={16} />
          <Input type="submit" />
        </div>
      </FormContent>
    </Form>
  );
}
