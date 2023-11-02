import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { tableDetailStyles } from './styles.css';

export default function TableDetailButton(props: {
  onClick: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  actionStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}) {
  const { t } = useTranslation();
  return (
    <div className={tableDetailStyles.actionContainer}>
      <div
        className={tableDetailStyles.action}
        onClick={props.onClick}
        style={props.actionStyle}
      >
        <span
          className={tableDetailStyles.detailText}
          style={props.contentStyle}
        >
          {props.children || t('common:detail')}
        </span>
      </div>
    </div>
  );
}
