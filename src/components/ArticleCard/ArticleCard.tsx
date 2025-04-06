import { FC } from 'react';
import { Card } from '@mantine/core';
import { Article } from '@/types/types';
import { ArticleUserInfo } from './ArticleUserInfo';
import { ArticleCardFooter } from './ArticleCardFooter';
import { ArticleCardHeader } from './ArticleCardHeader';
import { ArticleCardTagList } from './ArticleCardTagList';

import classes from './ArticleCard.module.css';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const { slug, title, description, tagList, author, favoritesCount, createdAt } = article;
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <ArticleCardHeader slug={slug} title={title} description={description} />
      <ArticleCardTagList tags={tagList} />
      <ArticleUserInfo author={author} createdAt={createdAt} />
      <ArticleCardFooter favoritesCount={favoritesCount} />
    </Card>
  );
};
