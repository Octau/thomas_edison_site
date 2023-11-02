import {
  getCustomerKey,
  getCustomersKey,
  useGetCustomer,
  useUpdateCustomer,
} from 'api-hooks/customer';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import CustomerForm from './components/form';

interface Props {
  id: string;
  dismiss: () => void;
}

export default function CustomerView(props: Props) {
  const { t } = useTranslation();
  const { id, dismiss } = props;
  const { mutateAsync: mutateUpdate } = useUpdateCustomer();
  const { data, isLoading } = useGetCustomer({ id });

  return (
    <DefaultDialog onClose={dismiss} title={t('common:view')}>
      {data?.data && !isLoading && (
        <CustomerForm
          customer={data?.data}
          onSubmit={async (input, form) => {
            const result = await mutateUpdate({
              body: input,
              id,
            });

            notification.success({ message: result?.message });
            queryClient.refetchQueries([getCustomersKey()[0]]);
            queryClient.refetchQueries(getCustomerKey({ id }));
            form.reset();
            dismiss();
          }}
        />
      )}
    </DefaultDialog>
  );
}
