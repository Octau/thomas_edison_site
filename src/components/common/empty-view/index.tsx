import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { styles } from './style.css';

interface Props {
  children?: React.ReactNode;
}

export default function EmptyView(props: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.children || (
          <>
            <Text textVariant="HeadingMedium">{t('common:no_data')}</Text>
          </>
        )}
      </div>
    </div>
  );
}
