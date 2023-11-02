import { NavigationRoutes } from 'common/constants';
import useNavigation from 'hooks/use-navigation';
import { moduleStyles } from 'modules/styles.css';
import React from 'react';

import Text from '../text';

interface Props {
  route: keyof typeof NavigationRoutes;
  id: string;
  children: React.ReactNode;
}

export default function TextLink(props: Props) {
  const { navigate } = useNavigation();
  const { route, id, children } = props;
  return (
    <span
      onClick={() => {
        navigate(NavigationRoutes[route], {
          params: {
            id,
          },
        });
      }}
      className={moduleStyles.pointer}
    >
      <Text className={moduleStyles.titleProduct} textVariant="BodyDefault">
        {children}
      </Text>
    </span>
  );
}
