import { IconHeart, IconStar } from '@tabler/icons-react';
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { Avatar, Button, Group, Paper, Tabs, Text, useMantineTheme } from '@mantine/core';
import classes from '../../../components/UserInfo/UserInfo.module.css';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
});

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

type TabKey = '' | 'favorites' | 'saved';
type TabValue = 'articles' | 'favorites' | 'saved';

const tabMap: Record<TabKey, TabValue> = {
  '': 'articles',
  favorites: 'favorites',
  saved: 'saved',
};

const pathMap: Record<TabValue, TabKey> = {
  articles: '',
  favorites: 'favorites',
  saved: 'saved',
};

function RouteComponent() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const router = useRouter()

  const username = 'Jane Fingerlicker';
  
  // Extract the path segment after the username
  const pathSegments = router.state.location.pathname.split('/');
  const currentPath = pathSegments.length > 3 ? pathSegments[3] : '';

  const currentTab = tabMap[currentPath as TabKey] || 'articles';

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    const path = pathMap[value as TabValue];
    if (path === '') {
      navigate({ to: '/profile/$username', params: { username } });
    } else {
      navigate({ to: `/profile/$username/${path}`, params: { username } });
    }
  };

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

  console.log({pathSegments, currentPath, currentTab, pathname: router.state.location.pathname})

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
      <Tabs defaultValue={currentTab} onChange={handleTabChange} classNames={{ tab: classes.tab }} mt="md">
        <Tabs.List>
          <Tabs.Tab value="articles">My Articles</Tabs.Tab>
          <Tabs.Tab
            value="favorites"
            leftSection={<IconHeart size={16} stroke={1.5} color={theme.colors.red[6]} />}
          >
            Liked Posts
          </Tabs.Tab>
          <Tabs.Tab
            value="saved"
            leftSection={<IconStar size={16} stroke={1.5} color={theme.colors.yellow[6]} />}
          >
            Saved Articles
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="articles">
          <Outlet />
        </Tabs.Panel>

        <Tabs.Panel value="favorites">
          <Outlet />
        </Tabs.Panel>

        <Tabs.Panel value="saved">
          <Outlet />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
