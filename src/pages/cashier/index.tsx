import Layout from 'containers/layout';
import Cashier from 'modules/cashier/cashier';
import * as React from 'react';

export default function CashierPage() {
  return <Cashier />;
}

CashierPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
