import Layout from 'containers/layout';
import PurchaseInventoryCreate from 'modules/purchase-inventory/create';
import * as React from 'react';

export default function PurchaseInventoryPage() {
  return <PurchaseInventoryCreate />;
}

PurchaseInventoryPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
