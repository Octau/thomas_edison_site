import {
  PurchaseInventoryModel,
  PurchaseInventoryMutationInput,
} from 'api-hooks/purchase-inventory/model';
import classNames from 'classnames';
import notification from 'common/helpers/notification';
import { ApiError } from 'common/repositories/common.model';
import { string2money } from 'common/utils/string';
import FooterDivider from 'components/common/footer-divider';
import HOCInput from 'components/common/hoc-input';
import { Input } from 'components/elements/field';
import Form, { FormFooter } from 'components/elements/form';
import Text from 'components/elements/text';
import FormHeader from 'components/widgets/form-header';
import DefaultContainer from 'containers/default-container';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { moduleStyles } from 'modules/styles.css';
import SupplierSelectInput from 'modules/supplier/components/select-input';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { PISchema } from './form-type';
import PurchaseInventoryItemField from './item-table';
import { PITotalCalculation } from './total-calculation';
import { purchaseInventoryStyles } from '../style.css';

interface Props {
  purchaseInventory?: PurchaseInventoryModel;
  onSubmit?: (
    input: PurchaseInventoryMutationInput,
    form: ReturnType<typeof useForm<PurchaseInventoryMutationInput>>,
  ) => Promise<any | undefined>;
}

export default function PurchaseInventoryForm(props: Props) {
  const { t } = useTranslation();
  const { purchaseInventory } = props;

  const defaultValues = React.useMemo<PurchaseInventoryMutationInput>(
    () => ({
      items: (purchaseInventory?.items as any) || [],
      totalPrice: purchaseInventory?.totalPrice || 0,
      supplierId: purchaseInventory?.supplier.id || null,
      transactionAt: purchaseInventory?.transactionAt || new Date(),
      createdAt: purchaseInventory?.createdAt || null,
    }),
    [purchaseInventory],
  );

  const resolver = useYupValidationResolver(PISchema);

  const methods = useForm<PurchaseInventoryMutationInput>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      values.totalPrice = PITotalCalculation(values.items);
      await props.onSubmit?.(values, methods);
    } catch (error) {
      const err = error as ApiError;
      notification.error({ message: err.message });
    }
  };

  return (
    <DefaultContainer>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        defaultEditable={!purchaseInventory}
      >
        <FormHeader
          title={`${t('menu:purchase_inventory')} ${t(
            `common:${purchaseInventory ? 'view' : 'add'}`,
          )}`}
          noSubmit
        />
        <div
          className={classNames(
            moduleStyles.fullContainer,
            purchaseInventoryStyles.content,
          )}
        >
          <div className={moduleStyles.halfContainer}>
            {!!purchaseInventory && (
              <Input
                type="date"
                name="createdAt"
                label={t('common:created_at')}
                disabled
              />
            )}
            <Input
              type="date"
              name="transactionAt"
              label={t('common:transaction_at')}
              required
            />
            <SupplierSelectInput name="supplierId" required />
          </div>
          <PurchaseInventoryItemField />
        </div>
        <FooterDivider />
        <FormFooter
          showSubmit
          renderLeft={
            <div className={purchaseInventoryStyles.subtotalContainer}>
              <HOCInput keys={['items']}>
                {({ items }) => (
                  <Text textVariant="HeadingSmall">
                    {t('common:total')}
                    {`: Rp ${string2money(PITotalCalculation(items))}`}
                  </Text>
                )}
              </HOCInput>
            </div>
          }
        />
      </Form>
    </DefaultContainer>
  );
}
