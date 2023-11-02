import * as React from 'react';

import { loginStyles } from './styles.css';

export default function LoginLayout(props) {
  return <div {...props} className={loginStyles.bg} />;
}
