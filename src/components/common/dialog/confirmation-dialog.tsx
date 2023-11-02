import { Modal } from '@mantine/core';
import Button from 'components/elements/button/default';
import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import Separator from '../separator';

export interface ConfirmationOption {
  title?: string;
  message: string;
  positiveLabel?: string;
  negativeLabel?: string;
  onPositiveAction: (dismiss: VoidFunction) => void;
  onNegativeAction?: (dismiss: VoidFunction) => void;
  noNegative?: boolean;
}

interface Props extends ConfirmationOption {
  onClose: () => void;
}

export default function ConfirmationDialog(props: Props) {
  const { t } = useTranslation();
  const {
    title,
    message,
    positiveLabel = t('common:sure'),
    negativeLabel = t('common:no'),
    onPositiveAction,
    onNegativeAction,
    noNegative = false,
    onClose,
  } = props;

  const onPositivePress = React.useCallback(() => {
    onPositiveAction(onClose);
  }, [onClose, onPositiveAction]);

  const onNegativePress = React.useCallback(() => {
    if (onNegativeAction) {
      onNegativeAction(onClose);
    } else {
      onClose();
    }
  }, [onClose, onNegativeAction]);

  return (
    <Modal
      onClose={onClose}
      opened
      centered
      size={600}
      title={<Text textVariant="HeadingSmall">{title}</Text>}
    >
      {message}
      <Separator gap={32} />
      <div>
        <Button onClick={onPositivePress} fullWidth>
          {positiveLabel}
        </Button>
        <Separator gap={8} />
        {!noNegative && (
          <Button onClick={onNegativePress} variant="tertiary" fullWidth>
            {negativeLabel}
          </Button>
        )}
      </div>
    </Modal>
  );
}
