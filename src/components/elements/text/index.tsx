import { Text as RawText, TextProps as RawTextProps } from '@mantine/core';
import classNames from 'classnames';
import typography from 'common/styles/typography';
import { forwardRef } from 'react';

import { styles } from './styles.css';

export interface TextProps extends RawTextProps {
  textVariant?: keyof typeof typography;
}

const Text = forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const { className, textVariant, ...rest } = props;
  return (
    <RawText
      {...rest}
      ref={ref}
      className={classNames(styles({ variant: textVariant }), className)}
    />
  );
});

Text.displayName = 'Text';

export default Text;
