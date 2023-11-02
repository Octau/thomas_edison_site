import { inventoryKeys } from 'api-hooks/inventory';
import {
  getTransactionsKey,
  useCreateTransaction,
} from 'api-hooks/transaction';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import ListHeader from 'components/common/list-header';
import DefaultContainer from 'containers/default-container';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import CashierForm from './components/form';

export default function Cashier() {
  const { t } = useTranslation();
  const { mutateAsync } = useCreateTransaction();

  return (
    <DefaultContainer>
      <ListHeader
        title={t('menu:cashier')}
        showRefresh={false}
        showAdd={false}
      />
      <CashierForm
        onSubmit={async (values, form) => {
          const result = await mutateAsync(values);
          notification.success({ message: result?.message });
          queryClient.refetchQueries([getTransactionsKey()[0]]);
          queryClient.refetchQueries([inventoryKeys.listKey]);

          form.reset();
          return result.data;
        }}
      />
    </DefaultContainer>
  );
}
