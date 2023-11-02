import { mantineColors } from 'common/styles/default-colors';
import * as React from 'react';

interface Props {
  orientation: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function Divider(props: Props) {
  const {
    orientation,
    thickness = 1,
    color: backgroundColor = mantineColors(),
  } = props;

  const style = React.useMemo(() => {
    switch (orientation) {
      case 'vertical':
        return {
          width: thickness,
          height: '100%',
        };

      default:
        return {
          width: '100%',
          height: thickness,
        };
    }
  }, [orientation, thickness]);

  return (
    <div
      style={{
        content: '""',
        borderRadius: 999999,
        backgroundColor,
        ...style,
        ...props.style,
      }}
    />
  );
}
