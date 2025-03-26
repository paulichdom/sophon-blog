import { FC, Fragment } from 'react';
import { Box, Text } from '@mantine/core';
import classes from './ArticleCard.module.css';

export type ArticleCardHeaderProps = {
  title: string;
  description: string;
};

export const ArticleCardHeader: FC<ArticleCardHeaderProps> = ({ title, description }) => {
  return (
    <Fragment>
      <Text fw={700} className={classes.title}>
        {title}
      </Text>
      <Box>
        <Text truncate="end">{description}</Text>
      </Box>
    </Fragment>
  );
};
