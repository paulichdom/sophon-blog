import { FC } from 'react';
import { Divider, Drawer } from '@mantine/core';
import { Comment } from '../Comment/Comment';

type ResponsesDrawerProps = {
  opened: boolean;
  close: () => void;
};

export const ResponsesDrawer: FC<ResponsesDrawerProps> = ({ opened, close }) => {
  return (
    <Drawer opened={opened} onClose={close} title="Responses" position="right" size="sm">
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
    </Drawer>
  );
};
