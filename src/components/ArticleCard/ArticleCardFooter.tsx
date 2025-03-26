import { FC } from 'react';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { ActionIcon, Card, Group, Text, useMantineTheme } from '@mantine/core';
import classes from './ArticleCard.module.css';

export type ArticleCardFooterProps = {
  favoritesCount: number;
};

export const ArticleCardFooter: FC<ArticleCardFooterProps> = ({ favoritesCount }) => {
  const theme = useMantineTheme();
  return (
    <Card.Section className={classes.footer}>
      <Group justify="space-between">
        <Text fz="xs" c="dimmed">
          {favoritesCount} people liked this
        </Text>
        <Group gap={0}>
          <ActionIcon variant="subtle" color="gray">
            <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Card.Section>
  );
};
