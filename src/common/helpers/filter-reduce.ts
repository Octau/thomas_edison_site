import { Filter } from 'common/repositories/common.model';

const filterReduce = (filters: Filter[]) =>
  filters
    ?.filter((curr) => !!curr.value || !!curr.default)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [`${curr.name}`]: curr.value || curr.default,
      }),
      {},
    ) as unknown as string;

export default filterReduce;
