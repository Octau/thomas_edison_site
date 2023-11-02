import { ReactNode, useRef, useEffect } from 'react';

import { formControlStyle } from './style.css';
import Text from '../text';

export interface FormControlProps {
  label?: string;
  required?: boolean;
  hideLabel?: boolean;
  error?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  noMargin?: boolean;
}

export interface CustomLabelProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CustomLabel(props: CustomLabelProps) {
  const { label, required, disabled } = props;
  return (
    <Text textVariant="BodyBoldDefault">
      {label}
      {required && !disabled ? (
        <span className={formControlStyle.required}> *</span>
      ) : null}
    </Text>
  );
}

export default function FormControl(props: FormControlProps) {
  const { error, hideLabel, label, required, description, children, noMargin } =
    props;
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (error) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error]);

  return (
    <div
      className={formControlStyle.container({ noMargin: !!noMargin })}
      ref={ref}
    >
      {!hideLabel && label && <CustomLabel {...{ label, required }} />}
      {children}
      {!!description && (
        <Text children={description} className={formControlStyle.required} />
      )}
      {!!error && (
        <Text children={error} className={formControlStyle.required} />
      )}
    </div>
  );
}
