import Login from 'modules/login';
import LoginLayout from 'modules/login/layout';
import * as React from 'react';

export default function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = function getLayout(page) {
  return <LoginLayout {...{ children: page }} />;
};
