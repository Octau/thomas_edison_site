import {
  getSuppliersKey,
  useCreateSupplier,
  useDeleteSupplier,
} from 'api-hooks/supplier';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useDialog from 'hooks/use-dialog';
import { DeleteConfirmationDialog } from 'modules/common/confirmation';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import SupplierForm from './components/form';
import SupplierView from './view';

export default function useSupplierForm() {
  const dialog = useDialog();
  const { t } = useTranslation();
  const { mutateAsync: mutateCreate } = useCreateSupplier();
  const { mutateAsync: mutateDelete } = useDeleteSupplier();

  const createItem = () =>
    dialog.showCustom({
      render: (dismiss) => (
        <DefaultDialog onClose={dismiss} title={t('common:create')}>
          <SupplierForm
            onSubmit={async (input, form) => {
              const result = await mutateCreate(input);

              notification.success({ message: result?.message });
              queryClient.refetchQueries([getSuppliersKey()[0]]);
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
                const result = await mutateDelete({ supplierId: id });
                notification.success({ message: result.message });
                queryClient.refetchQueries([getSuppliersKey()[0]]);
              } catch (error) {
                notification.error({ message: error.message });
              }
            }}
            onNegativeAction={dismiss}
          />
        );
      },
    });

  const viewItem = (supplier) => {
    dialog.showCustom({
      render: (dismiss) => <SupplierView id={supplier.id} dismiss={dismiss} />,
    });
  };

  return { createItem, deleteItem, viewItem };
}
