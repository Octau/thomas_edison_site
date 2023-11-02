import { Filter } from 'common/repositories/common.model';
import React from 'react';

import { QueryFilterProps } from './query-filter';

interface QueryFilterState extends QueryFilterProps {
  filters: Filter[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const queryFilterContext = React.createContext<QueryFilterState>({
  filters: [],
  setFilters() {},
  setPage: () => {},
});
