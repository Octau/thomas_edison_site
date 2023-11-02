import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import classNames from 'classnames';
import { PlusIcon } from 'common/assets';
import { ApiError, PaginationMeta } from 'common/repositories/common.model';
import Separator from 'components/common/separator';
import { OptionProps, SelectProps } from 'components/elements/select';
import { camelizeKeys } from 'humps';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SelectItem = React.forwardRef<HTMLDivElement, any>(
  ({ label, value, className, ...others }: any, ref) => {
    if (value === 'actionLoad') {
      return (
        <div
          ref={ref}
          {...others}
          className={classNames(moduleStyles.actionContainer, className)}
        >
          <Separator gap={4} />
          {label}
        </div>
      );
    }

    if (value === 'actionCreate') {
      return (
        <div
          ref={ref}
          {...others}
          className={classNames(moduleStyles.actionContainer, className)}
        >
          <PlusIcon size={20} />
          <Separator gap={4} />
          {label}
        </div>
      );
    }
    return (
      <div {...others} className={className}>
        {label}
      </div>
    );
  },
);

interface Options<
  ListQueryData,
  ListQueryVariables,
  DetailQueryData,
  DetailQueryVariables,
> {
  useListQueryHook: (
    baseInputs: ListQueryVariables,
    baseOptions?: UseQueryOptions<ListQueryData, ApiError>,
  ) => UseQueryResult<ListQueryData, ApiError>;
  useDetailLazyQueryHook: (
    baseInputs: DetailQueryVariables,
    baseOptions?: UseQueryOptions<DetailQueryData, ApiError>,
  ) => UseQueryResult<DetailQueryData, ApiError>;
  listTransformer: (result: ListQueryData) => OptionProps[];
  detailTransformer: (result: DetailQueryData) => OptionProps;
  paginationTransformer: (result: ListQueryData) => PaginationMeta;
  getMemoizedListVariables: (
    page: number,
    query?: string,
  ) => ListQueryVariables;
  onSelectItem: (value: string | null) => void;
  getMemoizedDetailVariables: (value: string) => DetailQueryVariables;
  resetPageWhenQueryChanged?: boolean;
  renderCreate?: boolean;
  renderNoData?: boolean;
  onClickCreate?: () => void;
  createText?: string;
  value?: string | null;
  enabled?: boolean;
}

export default function useSelectInputHelper<
  ListQueryData,
  ListQueryVariables,
  DetailQueryData,
  DetailQueryVariables,
>(
  helperOptions: Options<
    ListQueryData,
    ListQueryVariables,
    DetailQueryData,
    DetailQueryVariables
  >,
): SelectProps {
  const { t } = useTranslation();
  const {
    renderNoData = false,
    renderCreate = false,
    createText = t('common:create_new'),
    onClickCreate = () => {},
    onSelectItem,
    useListQueryHook,
    useDetailLazyQueryHook,
    listTransformer,
    detailTransformer,
    paginationTransformer,
    getMemoizedListVariables,
    getMemoizedDetailVariables,
    value,
    resetPageWhenQueryChanged = true,
    enabled = true,
  } = helperOptions;
  const [options, setOptions] = React.useState<OptionProps[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<
    OptionProps | undefined
  >(undefined);
  const [query, setQuery] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const {
    isLoading: listLoading,
    data: list,
    error,
    refetch,
  } = useListQueryHook(getMemoizedListVariables(page, query), {
    enabled,
    onSuccess: (result) => {
      if (page === 1) {
        setOptions(
          listTransformer(
            camelizeKeys(result as any) as unknown as ListQueryData,
          ),
        );
      } else {
        setOptions((prevOptions) =>
          prevOptions.concat(
            listTransformer(
              camelizeKeys(result as any) as unknown as ListQueryData,
            ),
          ),
        );
      }
    },
  });

  const {
    isFetching: detailLoading,
    error: detailError,
    refetch: detailRefetch,
  } = useDetailLazyQueryHook(getMemoizedDetailVariables(value!), {
    enabled: !!value,
    onSuccess: (result) => {
      setSelectedOption(detailTransformer(result as DetailQueryData));
    },
  });

  React.useEffect(() => {
    if (!value) {
      setSelectedOption(undefined);
    }
  }, [value, getMemoizedDetailVariables]);

  const loading = listLoading || detailLoading;

  const onDropdownOpen = React.useCallback(() => {
    if (!isFocus) {
      setQuery(undefined);
    }

    if (error) {
      refetch();
    }

    if (detailError) {
      detailRefetch();
    }
    setIsFocus(true);
  }, [detailError, detailRefetch, error, refetch, isFocus]);

  const items = React.useMemo(() => {
    const _options = [
      ...(selectedOption
        ? [selectedOption].concat(
            options.filter((o) => o.value !== selectedOption?.value),
          )
        : options),
    ];

    const pagination = list && paginationTransformer(list);

    if (pagination && pagination.currentPage < pagination.lastPage) {
      _options.push({ label: 'Load More...', value: 'actionLoad' });
    }

    if (renderCreate) {
      _options.push({ label: createText, value: 'actionCreate' });
    }

    if (!pagination?.to! && renderNoData) {
      _options.unshift({
        label: t('common:no_data'),
        value: 'noData',
        disabled: true,
      });
    }
    return _options;
  }, [
    createText,
    list,
    options,
    paginationTransformer,
    renderCreate,
    renderNoData,
    selectedOption,
    t,
  ]);

  const onQueryChange = useDebouncedCallback(
    (q) => {
      if (isFocus) {
        resetPageWhenQueryChanged && setPage(1);
        setQuery(q || '');
      }
    },
    800,
    {
      trailing: true,
    },
  );

  const _onChange = React.useCallback(
    (params: string | null) => {
      const pagination = list && paginationTransformer(list);

      if (params === 'actionLoad' && pagination) {
        setPage(pagination.currentPage + 1);
      } else if (params === 'actionCreate') {
        onClickCreate();
      } else {
        onSelectItem(params);
        setIsFocus(false);
      }
    },
    [list, onClickCreate, onSelectItem, paginationTransformer],
  );

  const _value = React.useMemo(() => {
    return value;
  }, [value]);

  return {
    value: _value,
    data: items,
    disabled: loading,
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false),
    onSearchChange: onQueryChange,
    itemComponent: SelectItem,
    onChange: _onChange,
    onDropdownOpen,
    searchable: true,
  };
}
