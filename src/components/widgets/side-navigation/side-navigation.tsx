import { IconWeight } from '@phosphor-icons/react';
import classNames from 'classnames';
import { LockIcon, SignOutIcon } from 'common/assets';
import colors from 'common/styles/colors';
import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import Separator from 'components/common/separator';
import { Button } from 'components/elements/button';
import { Route } from 'containers/navigation';
import useDialog from 'hooks/use-dialog';
import ChangePassword from 'modules/change-password';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import LogoutModal from './components/logout-modal';
import NavigationComponent from './navigation-component';
import { sideNavigationStyles } from './style.css';

interface SideNavigationProps {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  routes: Route[];
}

export interface MappedRoute {
  title: string;
  subNav?: MappedRoute[];
  itemId?: string;
  leftIcon?: (
    color: string,
    size: number,
    weight: IconWeight,
  ) => React.ReactNode | JSX.Element;
  ariaLabel?: string;
}

export default function SideNavigation(props: SideNavigationProps) {
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const dialog = useDialog();

  const { isNavOpen, routes } = props;
  const { t } = useTranslation();

  const handleLogout = React.useCallback(async () => {
    dialog.showCustom({
      render(close) {
        return <LogoutModal onClose={close} />;
      },
    });
  }, [dialog]);

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

  const NAVIGATION = React.useMemo(() => {
    return routes
      .map((route) => MapAllRoute(route, ''))
      .filter((x) => x !== undefined);
  }, [MapAllRoute, routes]);

  const FILTERED_NAVIGATION: MappedRoute[] = React.useMemo(() => {
    if (NAVIGATION) {
      return FilterAllUnUsedNavigation([...NAVIGATION]);
    }

    return [];
  }, [FilterAllUnUsedNavigation, NAVIGATION]);

  const onFocusSearch = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.code === 'KeyF'
    ) {
      searchInputRef.current?.focus();
    }
    return false;
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onFocusSearch, false);

    return () => {
      document.removeEventListener('keydown', onFocusSearch, false);
    };
  }, []);

  const openChangePassword = React.useCallback(() => {
    dialog.showCustom({
      render(close) {
        return <ChangePassword close={close} />;
      },
    });
  }, [dialog]);

  return (
    <div
      className={classNames(
        'side-navigation-container',
        sideNavigationStyles.container({ isActive: isNavOpen }),
      )}
    >
      <FetchWrapperComponent
        component={
          <div
            className={sideNavigationStyles.navigationContainer({
              isActive: isNavOpen,
            })}
          >
            {FILTERED_NAVIGATION.map((nav, idx) => (
              <NavigationComponent
                route={nav}
                depth={1}
                key={`parent-${idx}`}
              />
            ))}
            <div className={sideNavigationStyles.logoutContainer}>
              <Separator
                gap={4}
                direction="vertical"
                style={{
                  backgroundColor: colors.dividerDefault,
                }}
              />
              <Separator gap={16} direction="vertical" />
              <Button
                variant="tertiary"
                className={sideNavigationStyles.actionButton}
                leftIcon={(size) => <LockIcon size={size} weight="duotone" />}
                onClick={openChangePassword}
              >
                {t('common:change_extra', { extra: t('common:password') })}
              </Button>
              <Separator gap={4} direction="vertical" />
              <Button
                variant="tertiary"
                className={sideNavigationStyles.actionButton}
                leftIcon={(size) => <SignOutIcon size={size} />}
                onClick={handleLogout}
              >
                {t('common:logout')}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
