import { FC } from 'react';
import { Button, Container, Divider, Text, Title } from '@mantine/core';
import { Article as ArticleDetails } from '@/types/types';
import { ArticleUserInfo } from '../ArticleCard/ArticleUserInfo';

export type ArticleProps = {
  article: ArticleDetails;
};

export const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <Container size="responsive">
      {/* TODO: Add sider for the comments */}
      <Title order={1}>{article.title}</Title>
      <ArticleUserInfo author={article.author} createdAt={article.createdAt} />
      <Divider my="md" />
      {/* TODO: Add support for displaying markdown */}
      <Text size="md">{article.body}</Text>
    </Container>
  );
};
