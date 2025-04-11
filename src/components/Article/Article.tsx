import { FC } from 'react';
import { Button, Text, Title } from '@mantine/core';
import { Article as ArticleDetails } from '@/types/types';

export type ArticleProps = {
  article: ArticleDetails;
};

export const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <>
      <Title order={1}>{article.title}</Title>
      <Text size="md">{article.body}</Text>
    </>
  );
};
