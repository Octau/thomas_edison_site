import classNames from 'classnames';
import { NavigationRoutes } from 'common/constants';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import useNavigation from 'hooks/use-navigation';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { styles } from './styles.css';
import { MappedRoute } from '../side-navigation';

interface Props {
  route: MappedRoute;
  depth: number;
}

export default function LinkComponent(props: Props) {
  const { route, depth } = props;
  const [hover, setHover] = React.useState<boolean>(false);
  const { navigate } = useNavigation();
  const pathname = usePathname();

  const _onChange = React.useCallback(() => {
    !!route.itemId && navigate(route.itemId as NavigationRoutes);
  }, [navigate, route.itemId]);

  const pathName = pathname.split('/')[1];

  const isSame = route.itemId && pathName === route.itemId;

  const style = React.useMemo(() => {
    if (isSame || hover) {
      return {
        backgrondColor: colors.bgMain,
        color: colors.white,
      };
    }
    return {
      backgrondColor: 'transparent',
      color: colors.textProduct,
    };
  }, [isSame, hover]);

  return (
    <div
      className={classNames(
        `${depth === 1 ? '' : 'before-border'} ${
          isSame ? 'before-border-active' : ''
        }`,
        styles.beforeBorder,
      )}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={_onChange}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={classNames(
          styles.linkContainer,
          isSame && styles.activeLinkContainer,
          !route.leftIcon &&
            route.itemId &&
            pathName !== route.itemId &&
            styles.childLink,
        )}
        style={{ paddingLeft: `${depth === 1 ? '12px' : '20px'}` }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            className={
              isSame || hover ? styles.activeIcon : styles.inactiveIcon
            }
          >
            {route?.leftIcon?.(style.color, 24, 'duotone')}
          </span>
          <Text
            textVariant={
              isSame || !!route.leftIcon ? 'BodyBoldDefault' : 'BodyDefault'
            }
            style={{
              ...(route?.leftIcon && { marginLeft: 12 }),
              color: isSame || hover ? colors.white : colors.textProduct,
            }}
          >
            {route.title}
          </Text>
        </div>
      </div>
    </div>
  );
}
