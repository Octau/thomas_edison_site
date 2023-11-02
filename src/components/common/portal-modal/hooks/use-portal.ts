import { useLayoutEffect, useRef } from 'react';

export default function usePortal(): HTMLElement {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement('div');
  useLayoutEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    const modalRoot = document.getElementById('portal-modal') as HTMLElement;
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);
  return elRef.current;
}
