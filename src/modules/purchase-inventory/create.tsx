import {
  getPurchaseInventoriesKey,
  useCreatePurchaseInventory,
} from 'api-hooks/purchase-inventory';
import { NavigationRoutes } from 'common/constants';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import useNavigation from 'hooks/use-navigation';
import * as React from 'react';

import PurchaseInventoryForm from './components/form';

export default function PurchaseInventoryCreate() {
  const { navigate } = useNavigation();
  const { mutateAsync } = useCreatePurchaseInventory();

  return (
    <PurchaseInventoryForm
      onSubmit={async (value, form) => {
        const result = await mutateAsync(value);
        notification.success({ message: result?.message });
        queryClient.refetchQueries([getPurchaseInventoriesKey()[0]]);

        form.reset();
        navigate(NavigationRoutes.PurchaseInventory);
        return result.data;
      }}
    />
  );
}
