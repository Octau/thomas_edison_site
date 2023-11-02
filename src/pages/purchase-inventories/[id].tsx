import Layout from 'containers/layout';
import PurchaseInventoryView from 'modules/purchase-inventory/view';
import * as React from 'react';

export default function PurchaseInventoryViewPage() {
  return <PurchaseInventoryView />;
}

PurchaseInventoryViewPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
