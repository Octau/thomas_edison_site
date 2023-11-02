import { useGetInventories } from 'api-hooks/inventory';
import { InventoryLiteModel } from 'api-hooks/inventory/model';
import { EditIcon, NotepadIcon, TrashIcon } from 'common/assets';
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

import useInventoryForm from './modal';

export default function InventoryList() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(15);
  const { createItem, deleteItem, viewItem, viewActivity } = useInventoryForm();
  const [searchItem, setSearchItem] = React.useState('');

  const _columns = React.useMemo<IColumn<InventoryLiteModel>[]>(
    () => [
      {
        header: '',
        accessorKey: 'action',
        minSize: 160,
        size: 160,
        enableResizing: false,
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
              <ActionIcon
                children={(size) => <NotepadIcon {...{ size }} />}
                onClick={() => viewActivity(original.id)}
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
        header: t('common:total_qty'),
        accessorKey: 'amount',
        minSize: 100,
        cell: ({ row }) => {
          const {
            original: { amount, type },
          } = row;
          return `${amount} ${type}`;
        },
      },
      {
        header: t('inventory:buy_price'),
        accessorKey: 'buyPrice',
        minSize: 200,
        textAlign: 'right',
        cell: ({ row: { original } }) => original.getBuyPrice,
      },
      {
        header: t('inventory:min_sell_price'),
        accessorKey: 'minSellPrice',
        minSize: 200,
        textAlign: 'right',
        cell: ({ row: { original } }) => original.getMinSellPrice,
      },
      {
        header: t('inventory:sell_price'),
        accessorKey: 'sellPrice',
        minSize: 200,
        textAlign: 'right',
        cell: ({ row: { original } }) => original.getSellPrice,
      },
    ],
    [deleteItem, t, viewActivity, viewItem],
  );

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    extras: [{ columns }],
  } = useComposedQuery(
    useGetInventories,
    { params: { page, limit, q: searchItem } },
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns),
  );

  return (
    <DefaultContainer>
      <ListHeader
        title={t('menu:inventory')}
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
