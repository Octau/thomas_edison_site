import { NotificationProps, showNotification } from '@mantine/notifications';

interface Props extends Omit<NotificationProps, 'color'> {}

const notification = {
  info: (props: Props) => showNotification({ ...props, color: 'blue' }),
  success: (props: Props) => showNotification({ ...props, color: 'green' }),
  error: (props: Props) => showNotification({ ...props, color: 'red' }),
};

export default notification;
