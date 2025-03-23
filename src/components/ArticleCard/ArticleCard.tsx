import { FC } from 'react';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
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
import { Author } from '../Home/Home';
import classes from './ArticleCard.module.css';

type ArticleCardProps = {
  title: string;
  description: string;
  date: string;
  avatar: string;
  author: Author;
  tagList: string[];
};

export const ArticleCard: FC<ArticleCardProps> = ({ title, description, tagList, author }) => {
  const theme = useMantineTheme();
  const tmpAvatar =
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png';
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Text fw={700} className={classes.title}>
        {title}
      </Text>
      <Box>
        <Text truncate="end">{description}</Text>
      </Box>
      <Flex gap="xs" justify="flex-start" align="center" direction="row" wrap="wrap">
        {tagList.map((tag, index) => (
          <Badge key={index} w="fit-content" variant="outline" mt="xs">
            {tag}
          </Badge>
        ))}
      </Flex>
      <Group mt="xs">
        <Avatar src={tmpAvatar} radius="sm" />
        <div>
          <Text fw={500}>{author.username}</Text>
          <Text fz="xs" c="dimmed">
            posted 34 minutes ago
          </Text>
        </div>
      </Group>
      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
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
