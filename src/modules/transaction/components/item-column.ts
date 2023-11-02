import { string2money } from 'common/utils/string';
import { IColumn } from 'components/elements/table';

export const transactionItemColumn: ({ t }) => IColumn<any>[] = ({ t }) => [
  {
    header: t('common:name'),
    accessorKey: 'inventoryName',
    size: 150,
    enableResizing: true,
    minSize: 150,
  },
  {
    header: t('common:price'),
    accessorKey: 'price',
    size: 200,
    isNumber: true,
    cell: ({ getValue }) => `Rp ${string2money(getValue() as string)}`,
  },
  {
    header: t('common:qty'),
    accessorKey: 'qty',
    size: 80,
    enableResizing: false,
  },
  {
    header: t('common:total'),
    accessorKey: 'subtotal',
    size: 200,
    isNumber: true,
    cell: ({ getValue }) => `Rp ${string2money(getValue() as string)}`,
  },
];
