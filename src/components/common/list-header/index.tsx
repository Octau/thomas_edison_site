import { PlusIcon, RefreshIcon } from 'common/assets';
import colors from 'common/styles/colors';
import { Button } from 'components/elements/button';
import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { listHeaderStyle } from './style.css';
import Separator from '../separator';

interface Props {
  onRefresh?: () => void;
  onCreate?: () => void;
  title?: string;
  subtitle?: string;
  showRefresh?: boolean;
  showAdd?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rightCustomComponent?: React.ReactNode;
  leftCustomComponent?: React.ReactNode;
  showBorder?: boolean;
}

export default function ListHeader(props: Props) {
  const { t } = useTranslation();

  const {
    title,
    subtitle,
    onRefresh,
    onCreate,
    rightCustomComponent,
    leftCustomComponent,
    showRefresh = true,
    showAdd = true,
    showBorder = false,
  } = props;

  return (
    <>
      <div className={listHeaderStyle.topContainer}>
        <div
          className={listHeaderStyle.leftActionContainer({
            margin: showRefresh,
          })}
        >
          <div className={listHeaderStyle.textContainer}>
            {!!title && <Text textVariant="HeadingSmall">{title}</Text>}
            {!!subtitle && (
              <>
                <div style={{ marginTop: 4 }} />
                <Text
                  style={{
                    color: colors.bgDark,
                  }}
                  textVariant="BodyBoldSmallest"
                >
                  {subtitle}
                </Text>
              </>
            )}
          </div>
          {leftCustomComponent && <>{leftCustomComponent}</>}
        </div>
        <div className={listHeaderStyle.rightContainer}>
          {!!rightCustomComponent && (
            <>
              <Separator gap={16} />
              {rightCustomComponent}
            </>
          )}
          {showRefresh && (
            <Button
              onClick={() => {
                onRefresh?.();
              }}
              leftIcon={(size) => <RefreshIcon size={size} />}
              variant="secondary"
              style={styles.button}
            >
              {t('common:refresh')}
            </Button>
          )}
          {showAdd && (
            <>
              <Separator gap={16} />
              <Button
                onClick={() => {
                  onCreate?.();
                }}
                leftIcon={(size) => <PlusIcon size={size} />}
                style={styles.button}
              >
                {t('common:create')}
              </Button>
            </>
          )}
        </div>
      </div>
      {showBorder && (
        <div className={listHeaderStyle.filterDivider({ showBorder })} />
      )}
    </>
  );
}

const styles = {
  button: {
    minWidth: '120px',
  },
};
