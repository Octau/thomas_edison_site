import { Modal } from '@mantine/core';
import logout from 'common/utils/auth';
import Separator from 'components/common/separator';
import { Button } from 'components/elements/button';
import Text from 'components/elements/text';
import { useKY } from 'hooks/use-ky';
import { moduleStyles } from 'modules/styles.css';
import { useRouter } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface LogoutModalProps {
  onClose: () => void;
}

export function useLogout() {
  const { setCredential, setRedirectLogout } = useKY();
  const { push } = useRouter();
  const handleLogout = React.useCallback(async () => {
    try {
      setRedirectLogout?.(true);
      setCredential(undefined);
      await logout();
      push('/login');
    } catch (e) {
      console.error(e);
    }
  }, [push, setCredential, setRedirectLogout]);
  return handleLogout;
}

export default function LogoutModal(props: LogoutModalProps) {
  const { t } = useTranslation();
  const logout = useLogout();

  const onLogout = React.useCallback(async () => {
    try {
      await logout();
      props.onClose();
    } catch (error) {
      console.error(error);
    }
  }, [logout, props]);

  return (
    <Modal
      opened
      closeButtonProps={{
        size: 20,
      }}
      size={500}
      onClose={props.onClose}
      title={<Text textVariant="HeadingSmall">{t('common:logout')}</Text>}
    >
      <Separator gap={32} />
      <div className={moduleStyles.column()}>
        <Separator gap={32} />
        <Text>{t('modal:confirmation_logout')}</Text>
      </div>
      <Separator gap={32} />

      <div className={moduleStyles.container}>
        <Button error onClick={onLogout}>
          {t('common:logout')}
        </Button>
        <Separator gap={16} />
        <Button variant="tertiary" onClick={props.onClose}>
          {t('common:cancel')}
        </Button>
      </div>
    </Modal>
  );
}
