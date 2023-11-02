import {
  getSupplierKey,
  getSuppliersKey,
  useGetSupplier,
  useUpdateSupplier,
} from 'api-hooks/supplier';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import DefaultDialog from 'components/common/dialog/default-dialog';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import SupplierForm from './components/form';

interface Props {
  id: string;
  dismiss: () => void;
}

export default function SupplierView(props: Props) {
  const { t } = useTranslation();
  const { id, dismiss } = props;
  const { mutateAsync: mutateUpdate } = useUpdateSupplier();
  const { data, isLoading } = useGetSupplier({ supplierId: id });

  return (
    <DefaultDialog onClose={dismiss} title={t('common:view')}>
      {data?.data && !isLoading && (
        <SupplierForm
          supplier={data?.data}
          onSubmit={async (input, form) => {
            const result = await mutateUpdate({
              body: input,
              supplierId: id,
            });

            notification.success({ message: result?.message });
            queryClient.refetchQueries([getSuppliersKey()[0]]);
            queryClient.refetchQueries(getSupplierKey({ supplierId: id }));
            form.reset();
            dismiss();
          }}
        />
      )}
    </DefaultDialog>
  );
}
