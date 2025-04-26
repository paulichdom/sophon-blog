import { FC } from 'react';
import { Card } from '@mantine/core';
import { ArticleData } from '@/types/types';
import { ArticleCardFooter } from './ArticleCardFooter';
import { ArticleCardHeader } from './ArticleCardHeader';
import { ArticleCardTagList } from './ArticleCardTagList';
import { ArticleUserInfo } from './ArticleUserInfo';
import classes from './ArticleCard.module.css';

type ArticleCardProps = {
  article: ArticleData;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const { slug, title, description, tagList, author, favoritesCount, createdAt, favorited } =
    article;
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <ArticleCardHeader slug={slug} title={title} description={description} />
      <ArticleCardTagList tags={tagList} />
      <ArticleUserInfo author={author} createdAt={createdAt} />
      <ArticleCardFooter articleSlug={slug} articleFavoritedState={{favoritesCount, favorited}} />
    </Card>
  );
};
