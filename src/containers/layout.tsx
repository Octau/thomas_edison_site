import { routes } from 'common/constants/route-list';
import { useSelector } from 'hooks/use-selector';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import NavigationComponent from './navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { getMe } = useSelector();

  React.useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Head>
        <title>{t('common:title_web')}</title>
      </Head>
      <NavigationComponent {...{ children, routes }} />
    </>
  );
}
