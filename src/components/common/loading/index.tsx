import { Loader } from '@mantine/core';

import { loadingStyles } from './styles.css';

interface Props {
  style?: React.CSSProperties;
}

export default function LoadingComponent(props: Props) {
  return (
    <div className={loadingStyles.container} style={props.style}>
      <Loader color="blue" />
    </div>
  );
}
