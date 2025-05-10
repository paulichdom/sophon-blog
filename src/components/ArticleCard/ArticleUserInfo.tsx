import { FC } from 'react';
import moment from 'moment';
import { Avatar, Group, Text } from '@mantine/core';
import { AuthorData } from '@/types/types';
import classes from './ArticleCard.module.css';
import { ROBOHASH_URL } from '@/shared/constants';

export type ArticleCardAvatarProps = {
  author: AuthorData;
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
