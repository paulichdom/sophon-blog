import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import moment from 'moment';
import { Group, Text } from '@mantine/core';
import { AuthorData } from '@/types/types';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import classes from './ArticleCard.module.css';

export type ArticleCardAvatarProps = {
  author: AuthorData;
  createdAt: string;
};

export const ArticleUserInfo: FC<ArticleCardAvatarProps> = ({ author, createdAt }) => {
  return (
    <Link
      to="/profile/$username"
      params={{ username: author.username }}
      className={classes.userInfoContainer}
    >
      <Group mt="xs" align="center" justify="center">
        <div>
          <UserAvatar
            username={author.username}
            sourceImage={author.image}
            altText={author.username}
            size={42}
            radius={42}
            color="initials"
          />
        </div>
        <div>
          <Text fw={500}>{author.username}</Text>
          <Text fz="xs" c="dimmed">
            posted {moment(createdAt).fromNow()}
          </Text>
        </div>
      </Group>
    </Link>
  );
};
