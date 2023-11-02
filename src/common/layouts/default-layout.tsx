import * as React from 'react';

interface DefaultLayoutProps {
  children: React.ReactNode;
  pageProps: any;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
