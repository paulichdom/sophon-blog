import { FC } from 'react';
import { Stack, Button } from '@mantine/core';

export type ArticleProps = {
  
}

export const Article: FC<ArticleProps> = () => {
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="sm"
    >
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}