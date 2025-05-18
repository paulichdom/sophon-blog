import { Skeleton, Stack } from '@mantine/core';
import { range } from '@/utils';

export const ArticleItemPendingComponent = () => {
  return (
    <Stack>
      {range(6).map((_, index) => (
        <Skeleton key={index} width="100%" height={224} radius="md" mb="lg" />
      ))}
    </Stack>
  );
};
