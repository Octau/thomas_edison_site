import {
  InventoryModel,
  InventoryMutationInput,
} from 'api-hooks/inventory/model';
import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import FormContent from 'components/common/form-content';
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
  inventory?: InventoryModel;
  onSubmit: (
    input: InventoryMutationInput,
    form: ReturnType<typeof useForm>,
  ) => Promise<any | undefined>;
}

export default function InventoryForm(props: Props) {
  const { t } = useTranslation();
  const { inventory } = props;

  const defaultValues = React.useMemo<InventoryMutationInput>(
    () => ({
      buyPrice: inventory?.buyPrice || 0,
      sellPrice: inventory?.sellPrice || 0,
      minSellPrice: inventory?.minSellPrice || 0,
      name: inventory?.name || '',
      amount: inventory?.amount || 0,
      type: inventory?.type || 'pieces',
    }),
    [inventory],
  );

  const resolver = useYupValidationResolver(
    Yup.object()
      .shape({
        name: Yup.string().required(),
        amount: Yup.number().required(),
        type: Yup.string().nullable().required(),
        buyPrice: Yup.number().nullable().required(),
        sellPrice: Yup.number().nullable().required(),
        minSellPrice: Yup.number().nullable().required(),
        note: Yup.string().nullable(),
      })
      .required(),
  );

  const methods = useForm<InventoryMutationInput>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (values: InventoryMutationInput) => {
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
            type="number"
            name="amount"
            label={t('common:amount')}
            placeholder={t('common:amount')}
            required
          />
          <Input
            type="text"
            name="type"
            label={t('common:type')}
            placeholder={t('common:type')}
            required
          />
          <Input
            type="number"
            name="buyPrice"
            label={t('inventory:buy_price')}
            placeholder={t('inventory:buy_price')}
            isMoneyFormat
            required
          />
          <Input
            type="number"
            name="minSellPrice"
            label={t('inventory:min_sell_price')}
            placeholder={t('inventory:min_sell_price')}
            isMoneyFormat
            required
          />
          <Input
            type="number"
            name="sellPrice"
            label={t('inventory:sell_price')}
            placeholder={t('inventory:sell_price')}
            isMoneyFormat
            required
          />
          <Input type="submit" />
        </div>
      </FormContent>
    </Form>
  );
}
