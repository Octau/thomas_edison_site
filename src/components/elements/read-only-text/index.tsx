import { forwardRef } from 'react';

import TextInput, { TextInputProps } from '../text-input';
interface Props extends Omit<TextInputProps, 'withAsterisk'> {}

const ReadOnlyText = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <TextInput {...props} disabled withAsterisk={false} ref={ref} />;
});

ReadOnlyText.displayName = 'ReadOnlyText';

export default ReadOnlyText;
