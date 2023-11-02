import { TrashIcon } from 'common/assets';
import { string2money } from 'common/utils/string';
import { ActionIcon } from 'components/elements/button';
import { Input } from 'components/elements/field';
import { IColumn } from 'components/elements/table';

export const PurchaseInventoryItemColumns: ({
  t,
  editable,
  remove,
}) => IColumn<any>[] = ({ t, editable, remove }) => [
  {
    header: t('common:name'),
    accessorKey: 'item.name',
    minSize: 180,
    size: 180,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input type="text" name={`items.${index}.item.name`} noMargin />
      ) : (
        original.item.name
      ),
  },
  {
    header: t('common:total_qty'),
    accessorKey: 'item.amount',
    minSize: 160,
    size: 160,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input type="number" name={`items.${index}.item.amount`} noMargin />
      ) : (
        original.item.amount
      ),
  },
  {
    header: t('inventory:qty_type'),
    accessorKey: 'item.type',
    minSize: 160,
    size: 160,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input type="text" name={`items.${index}.item.type`} noMargin />
      ) : (
        original.item.type
      ),
  },
  {
    header: t('inventory:buy_price'),
    accessorKey: 'item.buyPrice',
    minSize: 160,
    size: 160,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input
          type="number"
          name={`items.${index}.item.buyPrice`}
          noMargin
          isMoneyFormat
        />
      ) : (
        string2money(original.item.buyPrice)
      ),
  },
  {
    header: t('inventory:sell_price'),
    accessorKey: 'item.sellPrice',
    minSize: 160,
    size: 160,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input
          type="number"
          name={`items.${index}.item.sellPrice`}
          noMargin
          isMoneyFormat
        />
      ) : (
        string2money(original.item.sellPrice)
      ),
  },
  {
    header: t('inventory:min_sell_price'),
    accessorKey: 'item.minSellPrice',
    minSize: 180,
    size: 180,
    cell: ({ row: { index, original } }) =>
      editable ? (
        <Input
          type="number"
          name={`items.${index}.item.minSellPrice`}
          noMargin
          isMoneyFormat
        />
      ) : (
        string2money(original.item.sellPrice)
      ),
  },
  // {
  //   header: t('common:notes'),
  //   accessorKey: 'item.note',
  //   minSize: 180,
  //   size: 180,
  //   cell: ({ row: { index, original } }) =>
  //     editable ? (
  //       <Input type="text" name={`items.${index}.item.note`} noMargin />
  //     ) : (
  //       original.item.note
  //     ),
  // },
  ...(editable
    ? [
        {
          header: '',
          accessorKey: 'action',
          size: 60,
          enableResizing: false,
          cell: ({ row: { index } }) => (
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => remove(index)}
              children={(size) => <TrashIcon {...{ size }} />}
            />
          ),
        },
      ]
    : []),
];
