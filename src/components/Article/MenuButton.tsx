import { FC } from 'react';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Menu } from '@mantine/core';
import classes from './MenuButton.module.css';

type MenuButtonProps = {
  slug: string;
};

export const MenuButton: FC<MenuButtonProps> = ({ slug }) => {
  return (
    <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconDots size={20} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Link to="/editor/$slug" params={{ slug }} className={classes.link}>
          <Menu.Item leftSection={<IconEdit size={16} stroke={1.5} />}>Edit Article</Menu.Item>
        </Link>
        <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
          Delete Article
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
