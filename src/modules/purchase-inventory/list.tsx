import { Menu } from '@mantine/core';
import { TransactionLiteModel } from 'api-hooks/cashier/model';
import { useGetPurchaseInventories } from 'api-hooks/purchase-inventory';
import { ExportTypeEnum } from 'api-hooks/report/model';
import {
  ChevronDownIcon,
  ExportIcon,
  EyeIcon,
  PlusIcon,
  RefreshIcon,
} from 'common/assets';
import { NavigationRoutes } from 'common/constants';
import { formatDate, formatDateTime } from 'common/utils/date';
import ListHeader from 'components/common/list-header';
import { useApplyQueryFilter } from 'components/common/query-filter/query-filter';
import Separator from 'components/common/separator';
import { ActionIcon, Button } from 'components/elements/button';
import { IColumn } from 'components/elements/table';
import DefaultContainer from 'containers/default-container';
import useApplyQuerySort from 'hooks/use-apply-query-sort';
import useComposedQuery from 'hooks/use-composed-query';
import useNavigation from 'hooks/use-navigation';
import { useScreenSize } from 'hooks/use-screen-size';
import GeneralTableList from 'modules/common/table';
import ExportButton, {
  useExportDownloader,
} from 'modules/report/export-button';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

export default function PurchaseInventoryList() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(15);
  const [searchItem, setSearchItem] = React.useState('');
  const { navigate } = useNavigation();
  const { exportFile, isLoading: loadingExport } = useExportDownloader();
  const { isXSmall } = useScreenSize();

  const goToCreate = () => navigate(NavigationRoutes.PurchaseInventoryCreate);

  const goToDetail = React.useCallback(
    (id: string) => {
      navigate(NavigationRoutes.PurchaseInventoryView, {
        params: { id },
      });
    },
    [navigate],
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
                variant="transparent"
                onClick={() => goToDetail(original.id)}
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
        accessorKey: 'transactionAt',
        sortName: 'transaction_at',
        minSize: 250,
        cell: ({ getValue }) => formatDate(new Date(getValue() as string)),
      },
      {
        header: t('common:created_at'),
        accessorKey: 'createdAt',
        sortName: 'created_at',
        minSize: 250,
        cell: ({ getValue }) => formatDateTime(new Date(getValue() as string)),
      },
    ],
    [goToDetail, t],
  );

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    extras: [{ columns }, { filters, setFilters }],
  } = useComposedQuery(
    useGetPurchaseInventories,
    { params: { page, limit, q: searchItem } },
    useApplyQuerySort((data: any) => {
      return data.sorts;
    }, _columns),
    useApplyQueryFilter((data: any) => data.filters),
  );

  return (
    <DefaultContainer>
      <ListHeader
        title={t('menu:purchase_inventory')}
        onCreate={goToCreate}
        onRefresh={refetch}
        showAdd={!isXSmall}
        showRefresh={!isXSmall}
        rightCustomComponent={
          <>
            {isXSmall ? (
              <>
                <Button
                  onClick={() => refetch()}
                  leftIcon={(size) => <RefreshIcon size={size} />}
                  variant="secondary"
                  style={styles.button}
                >
                  {t('common:refresh')}
                </Button>
                <Separator gap={16} />
                <Menu
                  transitionProps={{ transition: 'pop' }}
                  position="bottom-end"
                >
                  <Menu.Target>
                    <Button
                      rightIcon={(size) => <ChevronDownIcon size={size} />}
                      loading={loadingExport}
                    >
                      {t('common:action')}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<PlusIcon />} onClick={goToCreate}>
                      {t('common:create')}
                    </Menu.Item>
                    <Menu.Item
                      icon={<ExportIcon />}
                      onClick={async () =>
                        await exportFile({
                          type: ExportTypeEnum.purchases,
                          filters,
                          params: { q: searchItem },
                        })
                      }
                    >
                      {t('common:export')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            ) : (
              <>
                <ExportButton
                  type={ExportTypeEnum.purchases}
                  filters={filters}
                  params={{ q: searchItem }}
                />
                <Separator gap={16} />
              </>
            )}
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

const styles = {
  button: {
    minWidth: '120px',
  },
};
