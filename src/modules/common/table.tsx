import notification from 'common/helpers/notification';
import {
  ApiError,
  Filter,
  PaginationMeta,
} from 'common/repositories/common.model';
import QueryFilter from 'components/common/query-filter/query-filter';
// import EmptyView from 'components/common/empty-view';
import Separator from 'components/common/separator';
import Pagination from 'components/elements/pagination';
import TableComponent, { IColumn } from 'components/elements/table';
import TextInput from 'components/elements/text-input';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface Props<T> {
  data?: T[];
  columns: IColumn<T>[];
  isLoading?: boolean;
  onSearch?: (serch: string) => void;
  uniqueKey?: string;
  error?: ApiError | null;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  limit?: number;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  meta?: PaginationMeta;
  searchPlaceholder?: string;
  filters?: Filter[];
  setFilters?: React.Dispatch<React.SetStateAction<Filter[] | undefined>>;
}

export default function GeneralTableList<T>(props: Props<T>) {
  const { t } = useTranslation();
  const {
    data,
    columns: _columns,
    isLoading,
    onSearch,
    uniqueKey,
    error,
    meta,
    searchPlaceholder = t('inventory:search_item'),
    filters,
    setFilters,
    setPage,
  } = props;

  const columns = React.useMemo(
    () => [
      {
        header: t('common:number'),
        accessorKey: 'index',
        stickyLeft: true,
        minSize: 48,
        maxSize: 48,
        cell: ({ row }) => {
          return (
            <>
              {row.index +
                1 +
                ((meta?.currentPage || 1) - 1) * (meta?.perPage || 1)}
            </>
          );
        },
      },
      ..._columns,
    ],
    [_columns, t, meta],
  );

  React.useEffect(() => {
    error?.message && notification.error({ message: error.message });
  }, [error?.message]);

  const onQueryChange = useDebouncedCallback(
    (event) => {
      props.setPage?.(1);
      onSearch?.(event.target.value);
    },
    800,
    {
      trailing: true,
    },
  );

  return (
    <>
      {onSearch && (
        <Separator gap={8}>
          <TextInput placeholder={searchPlaceholder} onChange={onQueryChange} />
        </Separator>
      )}
      {filters && setPage && setFilters && (
        <div className={moduleStyles.topContainer}>
          <QueryFilter
            setPage={setPage}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      )}
      <div className={moduleStyles.tableContainer}>
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={data || []}
          uniqueRowKey={uniqueKey}
        />
        {/* {!isLoading && (!data || data.length === 0) && <EmptyView />} */}
      </div>
      {props.page !== undefined &&
        !!props.setPage &&
        props.limit !== undefined &&
        !!props.setLimit && (
          <Pagination
            page={props.page}
            onPageChange={props.setPage}
            limit={props.limit}
            onLimitChange={props.setLimit}
            meta={props.meta}
          />
        )}
    </>
  );
}
