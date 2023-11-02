import * as React from 'react';

import { defaultContainerStyle } from './style.css';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}

export default function DefaultContainer(props: Props) {
  return <div {...props} className={defaultContainerStyle} />;
}
