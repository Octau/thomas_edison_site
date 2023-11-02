import Layout from 'containers/layout';
import TransactionList from 'modules/transaction/list';
import * as React from 'react';

export default function TransactionPage() {
  return <TransactionList />;
}

TransactionPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
