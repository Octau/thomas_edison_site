import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import { formContentStyle } from './style.css';

export default function FormContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={classNames(formContentStyle, props.className)} />
  );
}
