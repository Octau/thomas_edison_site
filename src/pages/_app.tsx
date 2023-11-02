/* eslint-disable react/no-unknown-property */
import 'reflect-metadata';
import 'flexboxgrid/css/flexboxgrid.css';
import 'styles/globals.css';
import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import resetStyle from 'common/constants/reset-style';
import { queryClient } from 'common/repositories/query-client';
import { DialogProvider } from 'hooks/use-dialog';
import { DrawerProvider } from 'hooks/use-drawer';
import KYContainer from 'hooks/use-ky';
import { SelectorProvider } from 'hooks/use-selector';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { setLocale } from 'yup';

import yupEnValidation from '../../locales/en/validation.yup';
import yupIdValidation from '../../locales/id/validation.yup';

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  //@ts-expect-error
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (locale === 'en') {
      setLocale(yupEnValidation as any);
    } else {
      setLocale(yupIdValidation as any);
    }
  }, [locale]);

  return (
    <>
      <style global jsx>
        {resetStyle}
      </style>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <TypographyStylesProvider>
          <Notifications
            limit={10}
            position="top-right"
            zIndex={9999999}
            autoClose={4000}
          />
          <SelectorProvider>
            <QueryClientProvider client={queryClient}>
              <DialogProvider>
                <DrawerProvider>
                  <KYContainer>
                    {getLayout(<Component {...pageProps} />)}
                  </KYContainer>
                </DrawerProvider>
              </DialogProvider>
            </QueryClientProvider>
          </SelectorProvider>
        </TypographyStylesProvider>
      </MantineProvider>
    </>
  );
}
