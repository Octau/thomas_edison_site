import { Loader } from '@mantine/core';
import { RefreshIcon } from 'common/assets';
import { mantineColors } from 'common/styles/default-colors';
import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { errorViewStyles } from './style.css';
import Separator from '../separator';

interface Props {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
  vertical?: boolean;
}

export default function ErrorViewComponent(props: Props) {
  const { t } = useTranslation();
  const { isLoading, vertical = false, refetch } = props;

  return (
    <div
      className={errorViewStyles.container({ vertical })}
      onClick={() => {
        if (!isLoading) {
          refetch && refetch();
        }
      }}
    >
      <div className={errorViewStyles.content({ vertical })}>
        <Text textVariant="BodyBoldDefault">
          {t('error:load_failed_title')}
        </Text>
        <Separator gap={8} />
        <div className={errorViewStyles.errorSpan}>
          {t('error:load_failed_message')}
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loader size={vertical ? 40 : 30} />
        ) : (
          <div className={errorViewStyles.refreshContainer}>
            <RefreshIcon
              width={vertical ? 40 : 30}
              height={vertical ? 40 : 30}
              color={mantineColors()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
