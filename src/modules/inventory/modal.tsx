import {
  inventoryKeys,
  useCreateInventory,
  useDeleteInventory,
} from 'api-hooks/inventory';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useDialog from 'hooks/use-dialog';
import ActivityLogDialog from 'modules/activity-log/dialog';
import { DeleteConfirmationDialog } from 'modules/common/confirmation';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import InventoryForm from './components/form';
import InventoryView from './view';

export default function useInventoryForm() {
  const dialog = useDialog();
  const { t } = useTranslation();
  const { mutateAsync: mutateCreate } = useCreateInventory();
  const { mutateAsync: mutateDelete } = useDeleteInventory();

  const createItem = () =>
    dialog.showCustom({
      render: (dismiss) => (
        <DefaultDialog onClose={dismiss} title={t('common:create')}>
          <InventoryForm
            onSubmit={async (input, form) => {
              const result = await mutateCreate(input);

              notification.success({ message: result?.message });
              queryClient.refetchQueries([inventoryKeys.listKey]);
              form.reset();
              dismiss();
            }}
          />
        </DefaultDialog>
      ),
    });

  const deleteItem = (id: string) =>
    dialog.showCustom({
      render: (dismiss) => {
        return (
          <DeleteConfirmationDialog
            title={t('common:delete')}
            message={t('confirmation:are_you_sure_want_to_delete')}
            dismiss={dismiss}
            onPositiveAction={async () => {
              try {
                const result = await mutateDelete({ id });
                notification.success({ message: result.message });
                queryClient.refetchQueries([inventoryKeys.listKey]);
              } catch (error) {
                notification.error({ message: error.message });
              }
            }}
            onNegativeAction={dismiss}
          />
        );
      },
    });

  const viewItem = (inventory) => {
    dialog.showCustom({
      render: (dismiss) => (
        <InventoryView id={inventory.id} dismiss={dismiss} />
      ),
    });
  };

  const viewActivity = (id: string) => {
    dialog.showCustom({
      render: (dismiss) => (
        <ActivityLogDialog subjectId={id} onClose={dismiss} />
      ),
    });
  };

  return { createItem, deleteItem, viewItem, viewActivity };
}
