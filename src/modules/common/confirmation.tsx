import { Modal } from '@mantine/core';
import Separator from 'components/common/separator';
import { Button } from 'components/elements/button';
import Text from 'components/elements/text';
import useDialog from 'hooks/use-dialog';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { handleError } from './error';

interface useConfirmProps {
  onCancel?: () => Promise<void>;
  dialogMessage?: string;
  dialogTitle?: string;
}
interface useConfirmDeleteProps extends useConfirmProps {
  purpose?: string;
}

interface DeleteConfirmationDialogProps {
  onPositiveAction(): void;
  onNegativeAction?: () => void;
  dismiss: () => void;
  title?: string;
  message?: string;
  purpose?: string;
}
export function DeleteConfirmationDialog(props: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();
  const {
    title = t('modal:delete_confirmation'),
    message = t('modal:confirmation_delete_text'),
    purpose = t('common:delete'),
    dismiss,
    onPositiveAction,
    onNegativeAction,
  } = props;

  const handlePositive = React.useCallback(() => {
    dismiss();
    onPositiveAction();
  }, [dismiss, onPositiveAction]);
  const handleNegative = React.useCallback(() => {
    dismiss();
    onNegativeAction?.();
  }, [dismiss, onNegativeAction]);

  return (
    <Modal
      opened
      onClose={dismiss}
      title={<Text textVariant="HeadingSmall">{title}</Text>}
      centered
      size={600}
    >
      <Text textVariant="BodyDefault">{message}</Text>
      <Separator gap={32} />
      <div>
        <Button error onClick={handlePositive} fullWidth>
          {purpose}
        </Button>
        <Separator gap={8} />
        <Button onClick={handleNegative} variant="tertiary" fullWidth>
          {t('common:cancel')}
        </Button>
      </div>
    </Modal>
  );
}

// To reduce boilerplate of onDelete
export function useConfirmDelete(props: {
  onConfirm: () => Promise<void>;
  options?: useConfirmDeleteProps;
}) {
  const dialog = useDialog();
  const onDelete = React.useCallback(async () => {
    dialog.showCustom({
      render(close) {
        return (
          <DeleteConfirmationDialog
            title={props.options?.dialogTitle}
            message={props.options?.dialogMessage}
            dismiss={close}
            purpose={props.options?.purpose}
            onPositiveAction={async () => {
              try {
                await props.onConfirm();
              } catch (error) {
                handleError(error);
              }
            }}
            onNegativeAction={async () => {
              props.options?.onCancel?.();
            }}
          />
        );
      },
    });
  }, [dialog, props]);
  return onDelete;
}

export function useConfirm(
  onConfirm: () => Promise<void>,
  options: useConfirmProps,
) {
  const dialog = useDialog();
  const { t } = useTranslation();
  const confirm = React.useCallback(() => {
    dialog.showConfirmation({
      title: options.dialogTitle || t('common:confirmation'),
      message: options.dialogMessage || t('modal:confirmation_text'),
      async onPositiveAction(dismiss) {
        dismiss();
        try {
          await onConfirm();
        } catch (e) {
          handleError(e);
        }
      },
      async onNegativeAction(dismiss) {
        dismiss();
        try {
          await options.onCancel?.();
        } catch (error) {
          handleError(error);
        }
      },
    });
  }, [dialog, onConfirm, options, t]);
  return confirm;
}
