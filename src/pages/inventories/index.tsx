import Layout from 'containers/layout';
import InventoryList from 'modules/inventory/list';
import * as React from 'react';

export default function InventoryPage() {
  return <InventoryList />;
}

InventoryPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
