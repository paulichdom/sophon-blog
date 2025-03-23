import { Container, SimpleGrid } from '@mantine/core';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Articles } from '../Home/Home';
import { FC } from 'react';

export type ArticlesCardsGridProps = {
  articles: Articles | undefined
}

export const ArticlesCardsGrid: FC<ArticlesCardsGridProps> = ({articles}) => {
  const cards = articles?.articles.map((article) => (
    <ArticleCard
      title={article.title}
      description={article.description}
      date={article.createdAt}
      avatar={article.author.image}
      author={article.author}
      tagList={article.tagList}
    />
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
