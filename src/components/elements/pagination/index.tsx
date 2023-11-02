import {
  Pagination as RawPagination,
  PaginationProps as RawPaginationProps,
} from '@mantine/core';
import { PaginationMeta } from 'common/repositories/common.model';
import colors from 'common/styles/colors';
import useTranslation from 'next-translate/useTranslation';

import { paginationStyles, styles } from './styles.css';
import Select from '../select';
import Text from '../text';

export interface PaginationProps extends Omit<RawPaginationProps, 'total'> {
  page: number;
  onPageChange: (page: number) => void;
  meta: PaginationMeta | undefined;
  limit: number;
  onLimitChange: (page: number) => void;
}

const selectOption = [
  { value: '15', label: '15' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

const Pagination = (props: PaginationProps) => {
  const { onPageChange, onLimitChange, meta, limit, ...rest } = props;
  const { t } = useTranslation();
  if (!meta || !meta.total) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.metaContainer}>
        <Text textVariant="BodyDefault" color={colors.textWeak}>
          {`${t('common:show')} `}
          <Text
            textVariant="BodyBoldDefault"
            className={styles.highlightText}
          >{`${meta.currentPage}-${meta.lastPage} `}</Text>
          {` ${t('common:of_total_items', { total: meta.total })}`}
        </Text>
      </div>

      <RawPagination
        {...rest}
        value={rest.page}
        onChange={onPageChange}
        total={meta.lastPage}
        className={paginationStyles}
        size="md"
      />
      <Select
        label=""
        data={selectOption}
        className={styles.select}
        onChange={(val) => onLimitChange(Number(val))}
        defaultValue={limit.toString()}
        size="sm"
      />
    </div>
  );
};

export default Pagination;
