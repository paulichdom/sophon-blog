import { FC } from 'react';
import { Card } from '@mantine/core';
import { Article } from '../Home/Home';
import { ArticleCardAvatar } from './ArticleCardAvatar';
import { ArticleCardFooter } from './ArticleCardFooter';
import { ArticleCardHeader } from './ArticleCardHeader';
import { ArticleCardTagList } from './ArticleCardTagList';
import classes from './ArticleCard.module.css';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const { title, description, tagList, author, favoritesCount, createdAt } = article;
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <ArticleCardHeader title={title} description={description} />
      <ArticleCardTagList tags={tagList} />
      <ArticleCardAvatar author={author} createdAt={createdAt} />
      <ArticleCardFooter favoritesCount={favoritesCount} />
    </Card>
  );
};
