import classNames from 'classnames';
import * as React from 'react';

import { detailComponentStyles } from './styles.css';

export default function DetailComponent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={classNames(detailComponentStyles.container, className)}
    />
  );
}
