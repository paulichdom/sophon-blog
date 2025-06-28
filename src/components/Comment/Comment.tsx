import { FC } from 'react';
import moment from 'moment';
import { Group, Text } from '@mantine/core';
import { CommentData } from '@/types/types';
import { UserAvatar } from '../UserAvatar/UserAvatar';

type CommentProps = {
  comment: CommentData;
};

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { createdAt, author, body } = comment;
  return (
    <div>
      <Group>
        <UserAvatar
          username={author.username}
          sourceImage={author.image}
          altText={author.username}
          size={42}
          radius={42}
          color="initials"
        />
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
