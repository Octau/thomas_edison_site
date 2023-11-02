/* eslint-disable react/no-unknown-property */
import { Drawer as RawDrawer, DrawerProps } from '@mantine/core';
import React, {
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface CustomOption extends Omit<DrawerProps, 'onClose' | 'opened'> {
  render: (close: () => void) => React.ReactNode;
}
interface Option {
  type: 'custom';
  option: CustomOption;
  onClose: () => void;
}

export interface DrawerHandler {
  showCustom: (option: CustomOption) => void;
}

function Drawer(props: any, ref: React.Ref<DrawerHandler>) {
  const [state, setState] = useState<Option | undefined>();
  const option = state && state.option;
  const type = state && state.type;
  const onClose = useCallback(() => {
    setState(undefined);
  }, [setState]);
  useImperativeHandle(ref, () => ({
    showCustom(customOption) {
      setState({
        type: 'custom',
        option: customOption,
        onClose,
      });
    },
  }));

  const result = useMemo(() => {
    if (type === 'custom') {
      const { render } = option as CustomOption;
      return render(onClose);
    }
    return null;
  }, [type, option, onClose]);

  if (state) {
    switch (state.type) {
      case 'custom':
        return (
          <>
            <style global jsx>
              {`
                body {
                  overflow: hidden;
                }
              `}
            </style>
            <RawDrawer
              {...option}
              position={option?.position || 'right'}
              onClose={onClose}
              opened={!!state}
              lockScroll={
                option?.lockScroll !== undefined ? option?.lockScroll : true
              }
              closeOnClickOutside={
                option?.closeOnClickOutside !== undefined
                  ? option?.closeOnClickOutside
                  : false
              }
            >
              {result}
            </RawDrawer>
          </>
        );
    }
  }
  return null;
}

export default React.forwardRef(Drawer);
