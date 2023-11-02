import {
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
  TabProps as RawTabProps,
  TabsPanelProps as RawTabPanelProps,
} from '@mantine/core';
import Text from 'components/elements/text';
import React from 'react';

import Separator from '../separator';

interface TabsHeader extends Omit<RawTabProps, 'value' | 'children' | 'icon'> {
  label: string;
  icon?: (size: number) => React.ReactNode;
}
interface TabContent
  extends Omit<RawTabPanelProps, 'value' | 'children' | 'content'> {
  content: React.ReactNode;
}
interface Item {
  value: string;
  header: TabsHeader;
  panel?: TabContent;
}

interface Props extends Omit<RawTabsProps, 'children'> {
  grow?: boolean;
  position?: 'left' | 'right' | 'center' | 'apart';
  items: Item[];
}

export default function Tabs(props: Props) {
  const { items, grow, position = 'left', ...rest } = props;
  return (
    <RawTabs {...rest}>
      <RawTabs.List grow={grow} position={position}>
        {items.map((item) => (
          <RawTabs.Tab
            value={item.value}
            {...item.header}
            icon={item.header?.icon ? item.header.icon(16) : ''}
          >
            <Text textVariant="BodyDefault">{item.header.label}</Text>
          </RawTabs.Tab>
        ))}
      </RawTabs.List>

      {items.map((item) => {
        if (item.panel) {
          const { content, ...rest } = item.panel;
          return (
            <RawTabs.Panel value={item.value} {...rest}>
              <Separator gap={24} direction="vertical" />
              {content}
            </RawTabs.Panel>
          );
        }
        return <></>;
      })}
    </RawTabs>
  );
}
