import {
  inventoryKeys,
  useGetInventory,
  useUpdateInventory,
} from 'api-hooks/inventory';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import InventoryForm from './components/form';

interface Props {
  id: string;
  dismiss: () => void;
}

export default function InventoryView(props: Props) {
  const { t } = useTranslation();
  const { id, dismiss } = props;
  const { mutateAsync: mutateUpdate } = useUpdateInventory();
  const { data, isLoading } = useGetInventory({ id });

  return (
    <DefaultDialog onClose={dismiss} title={t('common:view')}>
      {data?.data && !isLoading && (
        <InventoryForm
          inventory={data?.data}
          onSubmit={async (input, form) => {
            const result = await mutateUpdate({
              body: input,
              id,
            });

            notification.success({ message: result?.message });
            queryClient.refetchQueries([inventoryKeys.listKey]);
            queryClient.refetchQueries(inventoryKeys.detail({ id }));
            form.reset();
            dismiss();
          }}
        />
      )}
    </DefaultDialog>
  );
}
