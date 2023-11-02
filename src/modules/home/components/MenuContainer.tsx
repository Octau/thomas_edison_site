import { NavigationRoutes } from 'common/constants';
import { MappedRoute } from 'components/widgets/side-navigation/side-navigation';
import useNavigation from 'hooks/use-navigation';
import * as React from 'react';

import { styles } from './styles.css';

interface Props {
  route: MappedRoute;
  depth: number;
}

export default function LinkComponent(props: Props) {
  const { route } = props;
  const { navigate } = useNavigation();

  const _onChange = React.useCallback(() => {
    !!route.itemId && navigate(route.itemId as NavigationRoutes);
  }, [navigate, route.itemId]);

  return (
    <div className={styles.wrapper} onClick={_onChange}>
      <div className={styles.images}>
        {route?.leftIcon?.('#FFFFFF', 64, 'duotone')}
      </div>
      {route.title.toUpperCase()}
    </div>
  );
}
