import { TransactionLiteModel } from 'api-hooks/cashier/model';
import { ExportTypeEnum } from 'api-hooks/report/model';
import { useGetTransactions } from 'api-hooks/transaction';
import { EyeIcon } from 'common/assets';
import { formatDateTime } from 'common/utils/date';
import ListHeader from 'components/common/list-header';
import { useApplyQueryFilter } from 'components/common/query-filter/query-filter';
import Separator from 'components/common/separator';
import { ActionIcon } from 'components/elements/button';
import { IColumn } from 'components/elements/table';
import Text from 'components/elements/text';
import DefaultContainer from 'containers/default-container';
import useApplyQuerySort from 'hooks/use-apply-query-sort';
import useComposedQuery from 'hooks/use-composed-query';
import useDrawer from 'hooks/use-drawer';
import GeneralTableList from 'modules/common/table';
import ExportButton from 'modules/report/export-button';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import TransactionDetail from './components/drawer-detail';

export default function SupplierList() {
  const { t } = useTranslation();
  const [searchItem, setSearchItem] = React.useState('');
  const drawer = useDrawer();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(15);

  const onOpenDetail = React.useCallback(
    (id: string) =>
      drawer.showCustom({
        render: () => <TransactionDetail id={id} />,
        title: <Text textVariant="HeadingLarge">{t('common:view')}</Text>,
        size: 780,
        closeOnClickOutside: true,
      }),
    [drawer, t],
  );

  const _columns = React.useMemo<IColumn<TransactionLiteModel>[]>(
    () => [
      {
        header: '',
        accessorKey: 'action',
        size: 60,
        enableResizing: false,
        cell: ({ row }) => {
          const { original } = row;
          return (
            <div className={moduleStyles.tableActionContainer}>
              <ActionIcon
                children={(size) => <EyeIcon {...{ size }} />}
                onClick={() => onOpenDetail(original.id)}
                variant="transparent"
              />
            </div>
          );
        },
      },
      {
        header: t('common:code'),
        accessorKey: 'code',
        sortName: 'code',
        minSize: 250,
      },
      {
        header: t('common:transaction_at'),
        accessorKey: 'createdAt',
        sortName: 'created_at',
        minSize: 250,
        cell: ({ getValue }) => formatDateTime(new Date(getValue() as string)),
      },
    ],
    [onOpenDetail, t],
  );

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    extras: [{ columns }, { filters, setFilters }],
  } = useComposedQuery(
    useGetTransactions,
    { params: { page, limit, q: searchItem } },
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns),
    useApplyQueryFilter((data: any) => data.filters),
  );

  return (
    <DefaultContainer>
      <ListHeader
        title={t('menu:transaction')}
        showAdd={false}
        onRefresh={refetch}
        rightCustomComponent={
          <>
            <ExportButton
              type={ExportTypeEnum.transactions}
              filters={filters}
              params={{ q: searchItem }}
            />
            <Separator gap={16} />
          </>
        }
      />
      <GeneralTableList
        columns={columns}
        data={data?.data || []}
        onSearch={setSearchItem}
        isLoading={isLoading || isFetching}
        uniqueKey="id"
        {...{
          page,
          setPage,
          limit,
          setLimit,
          meta: data?.meta,
          error,
          filters,
          setFilters,
        }}
      />
    </DefaultContainer>
  );
}
