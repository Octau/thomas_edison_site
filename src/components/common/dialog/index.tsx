import React, {
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react';

import Confirmation, { ConfirmationOption } from './confirmation-dialog';

interface CustomOption {
  render: (close: () => void) => React.ReactNode;
}
interface Option {
  type: 'confirmation' | 'custom';
  option: ConfirmationOption | CustomOption;
  onClose: () => void;
}

export interface DialogHandler {
  showConfirmation: (option: ConfirmationOption) => void;
  showCustom: (option: CustomOption) => void;
}

function Dialog(props: any, ref: React.Ref<DialogHandler>) {
  const [state, setState] = useState<Option | undefined>();
  const option = state && state.option;
  const type = state && state.type;
  const onClose = useCallback(() => {
    setState(undefined);
  }, [setState]);
  useImperativeHandle(ref, () => ({
    showConfirmation(confirmationOption) {
      setState({
        type: 'confirmation',
        option: confirmationOption,
        onClose,
      });
    },
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
      case 'confirmation':
        return (
          <Confirmation
            onClose={onClose}
            {...(state.option as ConfirmationOption)}
          />
        );
      case 'custom':
        return <>{result}</>;
    }
  }
  return null;
}

export default React.forwardRef(Dialog);
