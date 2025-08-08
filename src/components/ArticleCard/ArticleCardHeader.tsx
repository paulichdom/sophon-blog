import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { Box, Text } from '@mantine/core';
import classes from './ArticleCard.module.css';

export type ArticleCardHeaderProps = {
  slug: string;
  title: string;
  description: string;
};

export const ArticleCardHeader: FC<ArticleCardHeaderProps> = ({ slug, title, description }) => {
  return (
    <>
      <Link
        to="/article/$slug"
        params={{
          slug,
        }}
        className={classes.titleLink}
      >
        <Text fw={700} className={classes.title}>
          {title}
        </Text>
      </Link>
      <Box>
        <Text truncate="end">{description}</Text>
      </Box>
    </>
  );
};
