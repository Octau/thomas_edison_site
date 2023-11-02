import { Modal } from '@mantine/core';
import Text from 'components/elements/text';
import * as React from 'react';

interface Props {
  onClose: () => void;
  size?: number;
  title?: React.ReactNode;
  children: React.ReactNode;
}

export default function DefaultDialog(props: Props) {
  return (
    <Modal
      opened
      centered
      onClose={props.onClose}
      size={props.size || 600}
      children={props.children}
      title={
        typeof props.title === 'string' ? (
          <Text textVariant="HeadingSmall">{props.title}</Text>
        ) : (
          props.title
        )
      }
    />
  );
}
