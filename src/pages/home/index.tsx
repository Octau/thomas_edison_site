import Layout from 'containers/layout';
import Home from 'modules/home/home';
import * as React from 'react';

export default function HomePage() {
  return <Home />;
}

HomePage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
