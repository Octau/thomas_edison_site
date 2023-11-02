import Text from 'components/elements/text';
import { moduleStyles } from 'modules/styles.css';
import * as React from 'react';

interface ListViewHeaderProps {
  title: string;
  onRenderRightSide?: React.ReactNode;
}

export default function ListViewHeader(props: ListViewHeaderProps) {
  const { title, onRenderRightSide } = props;

  return (
    <div className={moduleStyles.topFormContainer}>
      <Text style={{ marginBottom: '8px', marginTop: '8px' }}>{title}</Text>
      <div className={moduleStyles.buttonContainer}>{onRenderRightSide}</div>
    </div>
  );
}
