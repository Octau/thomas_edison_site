import { TransactionMutationInput } from 'api-hooks/transaction';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import CashierCards from './cashier-cards';
import { totalCalculation } from './total-calculation';

interface Props {
  onSubmit?: (
    input: TransactionMutationInput,
    form: ReturnType<typeof useForm<TransactionMutationInput>>,
  ) => Promise<any | undefined>;
}

export default function CashierForm(props: Props) {
  const defaultValues = React.useMemo<TransactionMutationInput>(
    () => ({
      items: [],
      totalPrice: 0,
    }),
    [],
  );

  const resolver = useYupValidationResolver(
    Yup.object()
      .shape({
        items: Yup.array()
          .of(
            Yup.object()
              .shape({
                customId: Yup.string().strip(true),
                inventoryId: Yup.string().nullable().required(),
                inventoryName: Yup.string().strip(true),
                price: Yup.number(),
                qty: Yup.number(),
                max: Yup.number().strip(true),
              })
              .required(),
          )
          .min(1)
          .required(),
        customerId: Yup.string().nullable(),
      })
      .required(),
  );

  const methods = useForm<TransactionMutationInput>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (values: TransactionMutationInput) => {
    try {
      values.totalPrice = totalCalculation({ fields: values.items });
      await props.onSubmit?.(values, methods);
    } catch (error) {
      if (error.errors) {
        formSetErrors(error.errors, methods.setError);
      }
      notification.error({ message: error.message });
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <CashierCards />
    </Form>
  );
}
