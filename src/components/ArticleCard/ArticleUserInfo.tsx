import { FC } from 'react';
import moment from 'moment';
import { Avatar, Group, Text } from '@mantine/core';
import { Author } from '@/types/types';
import classes from './ArticleCard.module.css';

const ROBOHASH_URL = 'https://robohash.org/';

export type ArticleCardAvatarProps = {
  author: Author;
  createdAt: string;
};

export const ArticleUserInfo: FC<ArticleCardAvatarProps> = ({ author, createdAt }) => {
  const avatar = author.image || `${ROBOHASH_URL}/${author.username}`;
  return (
    <div className={classes.userInfoContainer}>
      <Group mt="xs">
        <div>
          <Avatar src={avatar} radius="sm" />
        </div>
        <div>
          <Text fw={500}>{author.username}</Text>
          <Text fz="xs" c="dimmed">
            posted {moment(createdAt).fromNow()}
          </Text>
        </div>
      </Group>
    </div>
  );
};
