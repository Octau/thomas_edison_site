import { useGetInventories } from 'api-hooks/inventory';
import { InventoryLiteModel } from 'api-hooks/inventory/model';
import { TransactionMutationInput } from 'api-hooks/transaction';
import { string2money } from 'common/utils/string';
import { Button } from 'components/elements/button';
import { IColumn } from 'components/elements/table';
import useApplyQuerySort from 'hooks/use-apply-query-sort';
import useComposedQuery from 'hooks/use-composed-query';
import GeneralTableList from 'modules/common/table';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
} from 'react-hook-form';

import { cashierStyle } from '../style.css';

interface Props {
  append: UseFieldArrayAppend<TransactionMutationInput, 'items'>;
  update: UseFieldArrayUpdate<TransactionMutationInput, 'items'>;
  fields: FieldArrayWithId<TransactionMutationInput, 'items', 'customId'>[];
}

export default function InventoryListCard(props: Props) {
  const { t } = useTranslation();
  const { append, fields, update } = props;
  const [searchItem, setSearchItem] = React.useState('');

  const onAddItem = React.useCallback(
    (item: InventoryLiteModel) => {
      const found = fields.findIndex((curr) => curr.inventoryId === item.id);

      if (found > -1) {
        const data = fields[found];
        const newQty = data.qty + 1;
        if (newQty < item.amount) {
          update(found, {
            ...data,
            qty: newQty,
          });
        }
      } else {
        append({
          inventoryId: item.id,
          price: item.sellPrice,
          minPrice: item.minSellPrice,
          qty: 1,
          inventoryName: item.name,
          max: item.amount,
        });
      }
      setSearchItem('');
    },
    [append, fields, update],
  );

  const _columns = React.useMemo<IColumn<InventoryLiteModel>[]>(
    () => [
      {
        header: t('common:name'),
        accessorKey: 'name',
        minSize: 180,
      },
      {
        header: t('common:total_qty'),
        accessorKey: 'qty',
        minSize: 100,
        cell: ({ row }) => {
          const {
            original: { amount, type },
          } = row;
          return `${amount} ${type}`;
        },
      },
      {
        header: t('inventory:sell_price'),
        accessorKey: 'sellPrice',
        minSize: 150,
        textAlign: 'right',
        cell: ({ getValue }) => {
          return `Rp ${string2money(getValue() as number)}`;
        },
      },
      {
        header: '',
        accessorKey: 'action',
        size: 120,
        enableResizing: false,
        cell: ({ row }) => {
          const { original } = row;
          return (
            <Button variant="tertiary" onClick={() => onAddItem(original)}>
              {t('common:add')}
            </Button>
          );
        },
      },
    ],
    [onAddItem, t],
  );

  const {
    data,
    isLoading,
    isFetching,
    error,
    extras: [{ columns }],
  } = useComposedQuery(
    useGetInventories,
    {
      params: {
        page: 1,
        limit: -1,
        q: searchItem,
        sort: 'name',
        min_amount: 1,
      },
    },
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns),
  );

  return (
    <div className={moduleStyles.card}>
      <div className={cashierStyle.inventoryCard}>
        <GeneralTableList
          columns={columns}
          data={data?.data || []}
          onSearch={setSearchItem}
          isLoading={isLoading || isFetching}
          uniqueKey="id"
          {...{ meta: data?.meta, error }}
        />
      </div>
    </div>
  );
}
