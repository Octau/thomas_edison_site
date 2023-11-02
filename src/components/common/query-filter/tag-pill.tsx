import { ActionIcon } from '@mantine/core';
import { CancelIcon } from 'common/assets';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import * as React from 'react';

import { queryFilterStyles } from './style.css';
import Separator from '../separator';

interface Props {
  onClear?: () => void;
  onClick?: () => void;
  text?: string;
}

export default function TagPillComponent(props: Props) {
  return (
    <div className={queryFilterStyles.tagPill} onClick={props.onClick}>
      <Text>{props.text}</Text>
      <Separator gap={8} />
      <ActionIcon color="cyan" onClick={props.onClear} size="xs">
        <CancelIcon size={12} color={colors.sentimentDefault} />
      </ActionIcon>
    </div>
  );
}
