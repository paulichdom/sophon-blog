import { FC } from 'react';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { range } from '@/utils';

type ArticleCardSkeletonProps = {
  rangeValue?: number;
};

export const ArticleCardSkeleton: FC<ArticleCardSkeletonProps> = ({ rangeValue = 6 }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {range(rangeValue).map((_, index) => (
        <Skeleton key={index} width="100%" height={224} radius="md" />
      ))}
    </SimpleGrid>
  );
};
