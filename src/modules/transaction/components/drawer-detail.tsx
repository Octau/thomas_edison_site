import { useGetTransaction } from 'api-hooks/transaction';
import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import TransactionForm from './form';

interface Props {
  id: string;
}

export default function TransactionDetail(props: Props) {
  const { t } = useTranslation();
  const { id } = props;
  const { data, isLoading } = useGetTransaction({ id });
  const transaction = data?.data;

  return (
    <>
      {!isLoading && transaction ? (
        <TransactionForm transaction={transaction} />
      ) : (
        <Text>{t('common:no_data')}</Text>
      )}
    </>
  );
}
