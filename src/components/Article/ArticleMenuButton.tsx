import { FC } from 'react';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import classes from './MenuButton.module.css';

type MenuButtonProps = {
  slug: string;
};

export const ArticleMenuButton: FC<MenuButtonProps> = ({ slug }) => {
  const handleDeleteArticle = () =>
    modals.openConfirmModal({
      title: 'Delete article',
      size: 'md',
      centered: true,
      children: (
        <Text size="md">Deletion is not reversible, and the story will be completely deleted.</Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

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
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={16} stroke={1.5} />}
          onClick={handleDeleteArticle}
        >
          Delete Article
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
