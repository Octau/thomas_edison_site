import { Flex, Stack } from '@mantine/core';
import { useGetNoticeInventories } from 'api-hooks/inventory';
import { ChevronRightIcon } from 'common/assets';
import config from 'common/config';
import { NavigationRoutes } from 'common/constants';
import { routes } from 'common/constants/route-list';
import ListHeader from 'components/common/list-header';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import { MappedRoute } from 'components/widgets/side-navigation/side-navigation';
import DefaultContainer from 'containers/default-container';
import { Route } from 'containers/navigation';
import { useSelector } from 'hooks/use-selector';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import MenuContainer from './components/MenuContainer';

export default function Home() {
  const { t } = useTranslation();
  const { userData } = useSelector();
  const { data } = useGetNoticeInventories();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function MapAllRoute(item: Route, searchValue) {
    if (item.children) {
      return {
        title: t(item.title, { extra: '' }),
        subNav: item?.children
          ?.map((child) => MapAllRoute(child, searchValue))
          .filter((x) => x !== undefined),
        leftIcon: item?.leftIcon,
      };
    }

    const navigation = {
      title: t(item.title, { extra: '' }),
      itemId: item.routeName,
      leftIcon: item?.leftIcon,
      ariaLabel: item.routeName,
    };
    if (searchValue) {
      const title = t(item.title, { extra: '' });
      if (title.toLowerCase().includes(searchValue.toLowerCase())) {
        return navigation;
      }
      return undefined;
    }
    return navigation;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function FilterAllUnUsedNavigation(item: any[]) {
    return item.filter((currentItem) => {
      if (!('subNav' in currentItem)) {
        return true;
      }

      if (currentItem?.subNav?.length) {
        const current = FilterAllUnUsedNavigation(currentItem?.subNav);

        currentItem.subNav = current;

        return !!current.length;
      } else {
        return false;
      }
    });
  }

  const _routes = routes.filter((route) => {
    if (
      route.routeName === NavigationRoutes.User &&
      config.specialId !== userData?.id
    ) {
      return false;
    }
    return true;
  });

  const NAVIGATION = React.useMemo(() => {
    return _routes
      .map((route) => MapAllRoute(route, ''))
      .filter((x) => x !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MapAllRoute, routes]);

  const FILTERED_NAVIGATION: MappedRoute[] = React.useMemo(() => {
    if (NAVIGATION) {
      return FilterAllUnUsedNavigation([...NAVIGATION]);
    }

    return [];
  }, [FilterAllUnUsedNavigation, NAVIGATION]);

  return (
    <DefaultContainer>
      <ListHeader title={t('menu:home')} showRefresh={false} showAdd={false} />
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {FILTERED_NAVIGATION.map((nav, idx) => (
          <MenuContainer route={nav} depth={1} />
        ))}
      </div>
      {(data?.data || []).length && (
        <Stack>
          <Separator gap={24} />
          <Text textVariant="HeadingSmall">{t('home:notice')}</Text>
          <Flex gap={16}>
            <Text>{t('home:item_less_than_100')}</Text>
            <Link href={NavigationRoutes.Inventory}>
              <Flex align="center">
                {t('menu:inventory')} <ChevronRightIcon />
              </Flex>
            </Link>
          </Flex>
          <ol>
            {data?.data.map((item) => (
              <li
                key={item.id}
              >{`${item.name} - ${item.amount} ${item.type}`}</li>
            ))}
          </ol>
        </Stack>
      )}
    </DefaultContainer>
  );
}
