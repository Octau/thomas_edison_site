import { Group } from '@mantine/core';
import { FilterIcon } from 'common/assets';
import { Exact } from 'common/repositories';
import { Filter, FilterType } from 'common/repositories/common.model';
import { Button } from 'components/elements/button';
import { format } from 'date-fns';
import produce from 'immer';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import styles from 'styles/Filter.module.css';

import FilterControl from './filter-control';
import { queryFilterContext } from './query-filter.context';
import TagPillComponent from './tag-pill';

const { Provider } = queryFilterContext;

export interface QueryFilterProps {
  filters?: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[] | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function QueryFilter(props: QueryFilterProps) {
  const { t } = useTranslation();
  const { filters, setFilters, setPage } = props;

  return (
    <div className={styles.filterContainer}>
      {!!filters && (
        <>
          <Provider value={{ ...props, filters }}>
            <Group spacing="xs">
              {filters.map((filter) => {
                const currentValue = filter.value || filter?.default;

                return currentValue ? (
                  <FilterControl
                    key={filter.name}
                    name={filter.name}
                    setPage={setPage}
                  >
                    {(toggleFilter) => (
                      <div className={styles.filterItemContainer}>
                        <TagPillComponent
                          onClick={toggleFilter}
                          onClear={() =>
                            setFilters((prevFilters) =>
                              produce(prevFilters, (draft) => {
                                const matchedFilter = draft?.find(
                                  (f) => f.name === filter.name,
                                );
                                if (matchedFilter) {
                                  matchedFilter.value = undefined;
                                }
                              }),
                            )
                          }
                          text={`${filter.label}:
                          ${
                            filter.type === FilterType.Date
                              ? format(new Date(currentValue!), 'dd MMMM yyyy')
                              : currentValue
                          }`}
                        />
                      </div>
                    )}
                  </FilterControl>
                ) : null;
              })}
              <FilterControl setPage={setPage}>
                {(toggleFilter) => (
                  <Button
                    leftIcon={(size) => <FilterIcon size={size} />}
                    onClick={toggleFilter}
                    variant="secondary"
                  >
                    {t('common:filter')}
                  </Button>
                )}
              </FilterControl>
            </Group>
          </Provider>
        </>
      )}
    </div>
  );
}

export function getFilterParams(filters: Filter[]) {
  return (
    filters &&
    filters.reduce((prev, next) => {
      if (next.value !== undefined && next.value !== null) {
        return {
          ...prev,
          [next.name]: next.value,
        };
      }
      return prev;
    }, {})
  );
}

export function useApplyQueryFilter<
  QueryData,
  QueryInput extends Exact<{ params: Exact<{ filter?: string | null }> }>,
>(getFilterMeta: (data: QueryData) => Filter[] | undefined) {
  const [filters, setFilters] = React.useState<Filter[] | undefined>();
  const filter =
    filters &&
    filters.reduce((prev, next) => {
      if (next.value !== undefined && next.value !== null) {
        return {
          ...prev,
          [next.name]: next.value,
        };
      }
      return prev;
    }, {});

  return {
    input: {
      params: {
        filter: (filter as string) || {},
      },
    } as unknown as QueryInput,
    onSuccess(data: QueryData) {
      setFilters(getFilterMeta(data));
    },
    extra: {
      filters,
      setFilters,
    },
  };
}
