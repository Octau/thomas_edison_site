import { useChangePassword } from 'api-hooks/user/mutation';
import notification from 'common/helpers/notification';
import { useLogout } from 'components/widgets/side-navigation/components/logout-modal';
import * as React from 'react';

import ChangePasswordModal from './modal';

interface ChangePasswordProps {
  close: () => void;
}

export default function ChangePassword({ close }: ChangePasswordProps) {
  const { mutateAsync } = useChangePassword();
  const logout = useLogout();

  const onSubmit = React.useCallback(
    async (values) => {
      const result = await mutateAsync(values);
      close();
      notification.success({ message: result.message });
      await logout();
    },
    [close, logout, mutateAsync],
  );

  return (
    <ChangePasswordModal
      {...{
        onSubmit,
        onClose: close,
      }}
    />
  );
}
