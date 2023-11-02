import { CashierCartMutationInput } from 'api-hooks/cashier/model';
import { TransactionModel } from 'api-hooks/transaction';
import { string2money } from 'common/utils/string';
import FormContent from 'components/common/form-content';
import HOCInput from 'components/common/hoc-input';
import Separator from 'components/common/separator';
import Form, { FormFooter } from 'components/elements/form';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import GeneralTableList from 'modules/common/table';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { transactionItemColumn } from './item-column';

interface Props {
  renderError?: React.ReactNode;
  transaction: TransactionModel;
}

export default function TransactionForm(props: Props) {
  const { t } = useTranslation();
  const { transaction } = props;

  const defaultValues = React.useMemo<CashierCartMutationInput>(
    () => ({
      totalPrice: transaction.totalPrice,
      items: transaction.items.map((item) => ({
        inventoryId: item.inventory.id,
        inventoryName: item.inventory.name,
        price: item.price,
        qty: item.qty,
        subtotal: item.qty * item.price,
      })),
    }),
    [transaction],
  );

  const methods = useForm<CashierCartMutationInput>({
    defaultValues,
  });

  const onSubmit = () => {};

  const columns = transactionItemColumn({ t });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={false}>
      <FormContent>
        <div className={moduleStyles.fullContainer}>
          {transaction?.customer && (
            <>
              <TextInput
                label={t('menu:customer')}
                value={transaction.customer || ''}
                readOnly
              />
              <Separator gap={16} />
            </>
          )}
          <HOCInput keys={['items']}>
            {({ items }) => <GeneralTableList columns={columns} data={items} />}
          </HOCInput>
        </div>
        <FormFooter
          renderRight={
            <HOCInput keys={['totalPrice']}>
              {({ totalPrice }) => (
                <>
                  <Text textVariant="HeadingSmall">{t('common:total')}:</Text>
                  <Separator gap={4} />
                  <Text textVariant="HeadingSmall">
                    Rp {string2money(totalPrice)}
                  </Text>
                </>
              )}
            </HOCInput>
          }
        />
      </FormContent>
    </Form>
  );
}
