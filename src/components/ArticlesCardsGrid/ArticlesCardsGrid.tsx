import { FC } from 'react';
import { Container, SimpleGrid } from '@mantine/core';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Articles } from '../Home/Home';

export type ArticlesCardsGridProps = {
  articles: Articles | undefined;
};

export const ArticlesCardsGrid: FC<ArticlesCardsGridProps> = ({ articles }) => {
  const cards = articles?.articles.map((article) => <ArticleCard article={article} />);

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
};
