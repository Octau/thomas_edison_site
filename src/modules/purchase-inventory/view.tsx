import { Flex } from '@mantine/core';
import { useGetPurchaseInventory } from 'api-hooks/purchase-inventory';
import { NavigationRoutes } from 'common/constants';
import LoadingComponent from 'components/common/loading';
import { Button } from 'components/elements/button';
import Text from 'components/elements/text';
import DefaultContainer from 'containers/default-container';
import useNavigation from 'hooks/use-navigation';
import { useRouter } from 'next/dist/client/router';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import PurchaseInventoryForm from './components/form';

export default function PurchaseInventoryView() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const id = query.id as string;
  const { navigate } = useNavigation();

  const { data, isLoading } = useGetPurchaseInventory({ id });
  const goBack = () => navigate(NavigationRoutes.PurchaseInventory);

  if (!data) {
    return (
      <DefaultContainer style={style}>
        <Text>{t('common:no_data')}</Text>
        <Button onClick={goBack}>{t('common:go_back')}</Button>
      </DefaultContainer>
    );
  }

  return (
    <>
      {isLoading ? (
        <Flex align="center" justify="center">
          <LoadingComponent />
        </Flex>
      ) : (
        <PurchaseInventoryForm purchaseInventory={data.data} />
      )}
    </>
  );
}

const style: React.CSSProperties = {
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
};
