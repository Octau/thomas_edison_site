import Drawer, { DrawerHandler } from 'components/common/drawer';
import React, { useRef, useMemo } from 'react';

const DrawerContext = React.createContext<DrawerHandler | undefined>(undefined);

export function DrawerProvider({ children }: any) {
  const DrawerRef = useRef<DrawerHandler>(null);
  const action = useMemo(
    () => ({
      showCustom(customOption: any) {
        if (DrawerRef.current) {
          DrawerRef.current.showCustom(customOption);
        }
      },
    }),
    [],
  );
  return (
    <>
      <DrawerContext.Provider value={action}>{children}</DrawerContext.Provider>
      <Drawer ref={DrawerRef} />
    </>
  );
}

export default function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('UseDrawer must be used within DrawerProvider');
  }
  return context;
}
