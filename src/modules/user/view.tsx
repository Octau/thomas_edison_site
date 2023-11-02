import { useGetUser, useUpdateUser, userKey } from 'api-hooks/user';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import UserForm from './components/form';

interface Props {
  id: string;
  dismiss: () => void;
}

export default function UserView(props: Props) {
  const { t } = useTranslation();
  const { id, dismiss } = props;
  const { mutateAsync: mutateUpdate } = useUpdateUser();
  const { data, isLoading } = useGetUser({ id });

  return (
    <DefaultDialog onClose={dismiss} title={t('common:view')}>
      {data?.data && !isLoading && (
        <UserForm
          user={data?.data}
          onSubmit={async (input, form) => {
            const result = await mutateUpdate({
              body: input,
              id,
            });

            notification.success({ message: result?.message });
            queryClient.refetchQueries(userKey.getUsersKey);
            queryClient.refetchQueries(userKey.getUser({ id }));
            form.reset();
            dismiss();
          }}
        />
      )}
    </DefaultDialog>
  );
}
