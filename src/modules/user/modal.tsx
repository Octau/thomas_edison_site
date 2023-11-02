import { userKey, useCreateUser, useDeleteUser } from 'api-hooks/user';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useDialog from 'hooks/use-dialog';
import { DeleteConfirmationDialog } from 'modules/common/confirmation';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import UserForm from './components/form';
import UserView from './view';

export default function useUserForm() {
  const dialog = useDialog();
  const { t } = useTranslation();
  const { mutateAsync: mutateCreate } = useCreateUser();
  const { mutateAsync: mutateDelete } = useDeleteUser();

  const createItem = () =>
    dialog.showCustom({
      render: (dismiss) => (
        <DefaultDialog onClose={dismiss} title={t('common:create')}>
          <UserForm
            onSubmit={async (input, form) => {
              const result = await mutateCreate(input);

              notification.success({ message: result?.message });
              queryClient.refetchQueries(userKey.getUsersKey);
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
                queryClient.refetchQueries(userKey.getUsersKey);
              } catch (error) {
                notification.error({ message: error.message });
              }
            }}
            onNegativeAction={dismiss}
          />
        );
      },
    });

  const viewItem = (user) => {
    dialog.showCustom({
      render: (dismiss) => <UserView id={user.id} dismiss={dismiss} />,
    });
  };

  return { createItem, deleteItem, viewItem };
}
