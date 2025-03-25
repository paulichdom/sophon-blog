import { FC } from 'react';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import moment from 'moment';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Article } from '../Home/Home';
import classes from './ArticleCard.module.css';

const ROBOHASH_URL = 'https://robohash.org/';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const theme = useMantineTheme();
  const { title, description, tagList, author, favoritesCount, createdAt } = article;
  const avatar = author.image || `${ROBOHASH_URL}/${author.username}`;
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Text fw={700} className={classes.title}>
        {title}
      </Text>
      <Box>
        <Text truncate="end">{description}</Text>
      </Box>
      <Flex gap="xs" justify="flex-start" align="center" direction="row" wrap="wrap">
        {/* TODO: Truncate tags */}
        {tagList.map((tag, index) => (
          <Badge key={index} w="fit-content" variant="outline" mt="xs">
            {tag}
          </Badge>
        ))}
      </Flex>
      <Group mt="xs">
        <Avatar src={avatar} radius="sm" />
        <div>
          <Text fw={500}>{author.username}</Text>
          <Text fz="xs" c="dimmed">
            posted {moment(createdAt).fromNow()}
          </Text>
        </div>
      </Group>
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
    </Card>
  );
};
