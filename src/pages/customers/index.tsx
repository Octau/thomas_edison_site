import Layout from 'containers/layout';
import CustomerList from 'modules/customer/list';
import * as React from 'react';

export default function CustomerPage() {
  return <CustomerList />;
}

CustomerPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
