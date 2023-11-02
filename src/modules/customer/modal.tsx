import {
  getCustomersKey,
  useCreateCustomer,
  useDeleteCustomer,
} from 'api-hooks/customer';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useDialog from 'hooks/use-dialog';
import { DeleteConfirmationDialog } from 'modules/common/confirmation';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import CustomerForm from './components/form';
import CustomerView from './view';

export default function useCustomerForm() {
  const dialog = useDialog();
  const { t } = useTranslation();
  const { mutateAsync: mutateCreate } = useCreateCustomer();
  const { mutateAsync: mutateDelete } = useDeleteCustomer();

  const createItem = () =>
    dialog.showCustom({
      render: (dismiss) => (
        <DefaultDialog onClose={dismiss} title={t('common:create')}>
          <CustomerForm
            onSubmit={async (input, form) => {
              const result = await mutateCreate(input);

              notification.success({ message: result?.message });
              queryClient.refetchQueries([getCustomersKey()[0]]);
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
                queryClient.refetchQueries([getCustomersKey()[0]]);
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
      render: (dismiss) => <CustomerView id={supplier.id} dismiss={dismiss} />,
    });
  };

  return { createItem, deleteItem, viewItem };
}
