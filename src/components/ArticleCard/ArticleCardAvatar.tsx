import { FC } from 'react';
import moment from 'moment';
import { Avatar, Group, Text } from '@mantine/core';
import { Author } from '../Home/Home';

const ROBOHASH_URL = 'https://robohash.org/';

export type ArticleCardAvatarProps = {
  author: Author;
  createdAt: string;
};

export const ArticleCardAvatar: FC<ArticleCardAvatarProps> = ({ author, createdAt }) => {
  const avatar = author.image || `${ROBOHASH_URL}/${author.username}`;
  return (
    <Group mt="xs">
      <Avatar src={avatar} radius="sm" />
      <div>
        <Text fw={500}>{author.username}</Text>
        <Text fz="xs" c="dimmed">
          posted {moment(createdAt).fromNow()}
        </Text>
      </div>
    </Group>
  );
};
