import Layout from 'containers/layout';
import SupplierList from 'modules/supplier/list';
import * as React from 'react';

export default function SupplierPage() {
  return <SupplierList />;
}

SupplierPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
