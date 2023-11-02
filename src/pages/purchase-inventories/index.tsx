import Layout from 'containers/layout';
import PurchaseInventoryList from 'modules/purchase-inventory/list';
import * as React from 'react';

export default function PurchaseInventoryPage() {
  return <PurchaseInventoryList />;
}

PurchaseInventoryPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
