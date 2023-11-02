import { Modal } from '@mantine/core';
import * as React from 'react';

import ActivityLogTable from './table';

interface Props {
  onClose: () => void;
  subjectId: string;
}

export default function ActivityLogDialog(props: Props) {
  return (
    <Modal
      opened
      closeButtonProps={{
        size: 20,
      }}
      size={1000}
      centered
      onClose={props.onClose}
    >
      <ActivityLogTable id={props.subjectId} />
    </Modal>
  );
}
