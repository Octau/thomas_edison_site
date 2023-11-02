import { createStyles, Group, Menu } from '@mantine/core';
import { ChevronDownIcon } from 'common/assets';
import { MouseEventHandler } from 'react';

import ActionIcon from './action';
import Button from './default';

export interface SplitButtonMenuProps {
  key: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export interface SplitButtonProps {
  rightButton: {
    menus: SplitButtonMenuProps[];
    disabled?: boolean;
  };
  button: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    text: string;
    disabled?: boolean;
    leftIcon?: (size: number) => React.ReactNode;
  };
  disabled?: boolean;
}

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export default function SplitButton(props: SplitButtonProps) {
  const { classes } = useStyles();
  const { button, rightButton, disabled } = props;

  return (
    <Group noWrap spacing={0}>
      <Button
        leftIcon={button.leftIcon}
        className={classes.button}
        children={button.text}
        disabled={disabled || button.disabled}
        onClick={button.onClick}
      />
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end">
        <Menu.Target>
          <ActionIcon
            className={classes.menuControl}
            children={(size) => <ChevronDownIcon {...{ size }} />}
            disabled={disabled || rightButton.disabled}
          />
        </Menu.Target>
        <Menu.Dropdown>
          {rightButton.menus.map((menu, idx) => (
            <Menu.Item
              key={`${menu}${idx}`}
              onClick={menu.onClick}
              disabled={menu.disabled}
            >
              {menu.key}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
