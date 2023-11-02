import { useGetSuppliers } from 'api-hooks/supplier';
import { SupplierLiteModel } from 'api-hooks/supplier/model';
import { EditIcon, TrashIcon } from 'common/assets';
import ListHeader from 'components/common/list-header';
import { ActionIcon } from 'components/elements/button';
import { IColumn } from 'components/elements/table';
import DefaultContainer from 'containers/default-container';
import useApplyQuerySort from 'hooks/use-apply-query-sort';
import useComposedQuery from 'hooks/use-composed-query';
import GeneralTableList from 'modules/common/table';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import useSupplierForm from './modal';

export default function SupplierList() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(15);
  const { createItem, deleteItem, viewItem } = useSupplierForm();
  const [searchItem, setSearchItem] = React.useState('');

  const _columns = React.useMemo<IColumn<SupplierLiteModel>[]>(
    () => [
      {
        header: '',
        accessorKey: 'action',
        minSize: 120,
        size: 120,
        cell: ({ row }) => {
          const { original } = row;
          return (
            <div className={moduleStyles.tableActionContainer}>
              <ActionIcon
                children={(size) => <EditIcon {...{ size }} />}
                onClick={() => viewItem(original)}
                variant="transparent"
              />
              <ActionIcon
                children={(size) => <TrashIcon {...{ size }} />}
                color="red"
                onClick={() => deleteItem(original.id)}
                variant="transparent"
              />
            </div>
          );
        },
      },
      {
        header: t('common:name'),
        accessorKey: 'name',
        sortName: 'name',
        minSize: 250,
      },
      {
        header: t('common:phone'),
        accessorKey: 'phone',
        minSize: 250,
      },
      {
        header: t('common:address'),
        accessorKey: 'address',
        minSize: 250,
      },
    ],
    [deleteItem, t, viewItem],
  );

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    extras: [{ columns }],
  } = useComposedQuery(
    useGetSuppliers,
    { params: { page, limit, q: searchItem } },
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns),
  );

  return (
    <DefaultContainer>
      <ListHeader
        title={t('menu:supplier')}
        onCreate={createItem}
        onRefresh={refetch}
      />
      <GeneralTableList
        columns={columns}
        data={data?.data || []}
        onSearch={setSearchItem}
        isLoading={isLoading || isFetching}
        uniqueKey="id"
        {...{ page, setPage, limit, setLimit, meta: data?.meta, error }}
      />
    </DefaultContainer>
  );
}
