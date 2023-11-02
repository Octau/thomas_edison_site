import { createPortal } from 'react-dom';

import usePortal from './hooks/use-portal';

export default function Portal({ children }) {
  const target = usePortal();
  return createPortal(children, target);
}
