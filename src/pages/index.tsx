import Layout from 'containers/layout';
import * as React from 'react';

export default function Home() {
  return <div />;
}

Home.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
