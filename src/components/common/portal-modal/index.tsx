import Portal from './portal';
import styles from './style.module.css';

export default function PortalModal({ children }) {
  return (
    <Portal children={<div className={styles.modalFull}>{children}</div>} />
  );
}
