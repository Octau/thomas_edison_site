import * as React from 'react';

import { cashierStyle } from '../style.css';

interface Props {
  children?: React.ReactNode;
  flex?: number;
  flexBasis?: number;
  height?: number;
  noMinHeight?: boolean;
  justify?: 'center' | 'flex-end' | 'flex-start';
}

export default function CartItem(props: Props) {
  const {
    children,
    noMinHeight,
    flex,
    flexBasis,
    height = 36,
    justify,
  } = props;

  const style = React.useMemo(
    () => ({
      flexBasis,
      flex,
      height: noMinHeight ? 'auto' : height,
      justifyContent: justify,
    }),
    [justify, flex, flexBasis, height, noMinHeight],
  );

  return (
    <div children={children} className={cashierStyle.cartItem} style={style} />
  );
}
