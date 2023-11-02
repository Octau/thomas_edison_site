import classNames from 'classnames';
import { ChevronDownIcon } from 'common/assets';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import * as React from 'react';

import { styles } from './styles.css';
import NavigationComponent from '../navigation-component';
import { MappedRoute } from '../side-navigation';

interface Props {
  route: MappedRoute;
  depth: number;
}

export default function CollapsibleComponent(props: Props) {
  const { route, depth } = props;
  const [isOpen, setOpen] = React.useState(true);

  const padding = React.useMemo(() => {
    if (!isOpen && depth > 1) {
      return '0px 0px 0px 20px';
    } else if (depth > 1) {
      return '8px 0px 8px 20px';
    } else return '8px 0 12px';
  }, [depth, isOpen]);

  return (
    <div
      className={classNames(
        `${depth === 1 ? '' : 'before-border'}`,
        styles.beforeBorder,
      )}
    >
      <div
        className={styles.collapsibleContainer}
        style={{ padding, paddingLeft: `${depth === 1 ? '12px' : '20px'}` }}
      >
        <div
          className={styles.iconContainer}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={styles.iconWrapper}>
            {route?.leftIcon?.('blue', 24, 'duotone')}
            {route?.leftIcon && <div style={{ marginRight: 12 }} />}
            <Text
              textVariant="BodyBoldDefault"
              style={{
                color: colors.black,
                flexGrow: 1,
              }}
            >
              {route.title}
            </Text>
            <div style={{ marginRight: 16 }} />
            <div
              className={styles.chevronContainer}
              style={{
                transform: `${isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}`,
              }}
            >
              <ChevronDownIcon color={colors.black} size={16} />
            </div>
          </div>
        </div>
        <div
          className={styles.column}
          style={{
            maxHeight: `${isOpen ? '100%' : '0'}`,
          }}
        >
          {route.subNav?.map((nav, idx) => (
            <NavigationComponent
              key={`depth-${depth}-${idx}`}
              route={nav}
              depth={depth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
