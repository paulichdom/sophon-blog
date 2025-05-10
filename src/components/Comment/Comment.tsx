import { FC } from 'react';
import moment from 'moment';
import { Avatar, Group, Text } from '@mantine/core';
import { ROBOHASH_URL } from '@/shared/constants';
import { CommentData } from '@/types/types';

type CommentProps = {
  comment: CommentData;
};

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { createdAt, author, body } = comment;
  const avatar = author.image || `${ROBOHASH_URL}/${author.username}`;
  return (
    <div>
      <Group>
        <Avatar src={avatar} alt={author.username} radius="xl" />
        <div>
          <Text size="sm">{author.username}</Text>
          <Text size="xs" c="dimmed">
            {moment(createdAt).fromNow()}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {body}
      </Text>
    </div>
  );
};
