import { IconHeart, IconStar } from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { range } from '@/utils';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { article } from './tmpMockArticle';
import classes from './UserInfo.module.css';

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

export function UserInfo() {
  const theme = useMantineTheme();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  const MockArticles = () =>
    range(6).map((_, index) => <ArticleCard key={index} article={article} />);

  return (
    <Paper radius="md" p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Jane Fingerlicker
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        jfingerlicker@me.io • Art director
      </Text>
      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>

      <Button radius="md" mt="xl" size="md" variant="default">
        Follow
      </Button>

      <Tabs defaultValue="gallery" classNames={{ tab: classes.tab }} mt="md">
        <Tabs.List>
          <Tabs.Tab value="gallery">My Articles</Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<IconHeart size={16} stroke={1.5} color={theme.colors.red[6]} />}
          >
            Liked Posts
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            leftSection={<IconStar size={16} stroke={1.5} color={theme.colors.yellow[6]} />}
          >
            Saved Articles
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" mt="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <MockArticles />
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="messages" mt="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <MockArticles />
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="settings" mt="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <MockArticles />
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
