import Layout from 'containers/layout';
import UserList from 'modules/user/list';
import * as React from 'react';

export default function UserPage() {
  return <UserList />;
}

UserPage.getLayout = function getLayout(page) {
  return <Layout {...{ children: page }} />;
};
