import { IconWeight } from '@phosphor-icons/react';
import config from 'common/config';
import { NavigationRoutes } from 'common/constants/navigation-routes';
import { routes } from 'common/constants/route-list';
import { layoutStyles } from 'common/layouts/styles.css';
import Header from 'components/widgets/header';
import SideNavigation from 'components/widgets/side-navigation/side-navigation';
import { useSelector } from 'hooks/use-selector';
import { useRouter } from 'next/dist/client/router';
import { compile } from 'path-to-regexp';
import * as React from 'react';

import { navigationStyle } from './style.css';

export interface Navigation {
  routeName: NavigationRoutes;
  key: string;
  isActive: boolean;
  params?: any;
  search?: any;
}

export interface NavigationProps {
  navigation: Navigation;
}

export interface NavigationOptions {
  params?: any;
  queryParams?: any;
  search?: any;
}
interface NavigationState {
  navigate: (route: NavigationRoutes, options?: NavigationOptions) => void;
  close: () => void;
  activeKey?: string;
}

export interface Route {
  routeName?: NavigationRoutes;
  component?: React.ComponentType<NavigationProps>;
  title: string;
  children?: Route[];
  leftIcon?:
    | ((color: string, size: number, weight: IconWeight) => React.ReactNode)
    | null;
}

export const NavigationContext = React.createContext<NavigationState>({
  navigate: () => {},
  close: () => {},
});

export type NavigationContextMenuPoint =
  | { x: number; y: number; key: string }
  | undefined;

export default function NavigationComponent(props: {
  routes?: Route[];
  badges?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = React.useState(router.pathname === '/');
  const { userData } = useSelector();

  const _onCloseNav = React.useCallback(() => {
    setIsNavOpen(false);
  }, [setIsNavOpen]);

  const navigate = React.useCallback(
    (route: NavigationRoutes, options?: NavigationOptions) => {
      try {
        const key = compile(route)(options?.params);
        const path = (key.startsWith('/') ? '' : '/') + key;

        router.push({
          pathname: path,
          query: options?.queryParams,
        });
        setIsNavOpen(false);
      } catch (e) {
        alert(e);
      }
    },
    [router],
  );

  const value = React.useMemo<NavigationState>(
    () => ({
      navigate,
      close: () => {
        router.back();
      },
    }),
    [navigate, router],
  );

  if (!userData) {
    return null;
  }

  const _routes = routes.filter((route) => {
    if (
      route.routeName === NavigationRoutes.User &&
      config.specialId !== userData.id
    ) {
      return false;
    }
    return true;
  });

  return (
    <NavigationContext.Provider value={value}>
      <div className={layoutStyles.layoutContainer}>
        <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <div className={navigationStyle.mobileWrapper}>
          <SideNavigation
            routes={_routes}
            setIsNavOpen={setIsNavOpen}
            isNavOpen={isNavOpen}
          />
          <div
            onClick={_onCloseNav}
            className={layoutStyles.overlayContainer({
              isActive: isNavOpen,
            })}
          />
          <div className={layoutStyles.content}>
            <div className={layoutStyles.scrollArea}>
              <div className={navigationStyle.content}>{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
