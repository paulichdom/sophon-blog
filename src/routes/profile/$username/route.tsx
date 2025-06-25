import { IconHeart } from '@tabler/icons-react';
import { createFileRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { Avatar, Button, Grid, Group, Stack, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useAuthStore } from '@/auth/auth.store';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import classes from '../../../components/UserInfo/UserInfo.module.css';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
});

const data = [
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    phone: '+44 (452) 886 09 12',
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    phone: '+44 (934) 777 12 76',
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    phone: '+44 (901) 384 88 34',
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    phone: '+44 (667) 341 45 22',
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    phone: '+44 (881) 245 65 65',
  },
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
  const router = useRouter();
  const { user } = useAuthStore();

  // Extract the path segment after the username
  const pathSegments = router.state.location.pathname.split('/');
  const currentPath = pathSegments.length > 3 ? pathSegments[3] : '';

  const currentTab = tabMap[currentPath as TabKey] || 'articles';

  if (!user) {
    navigate({ to: '/login' });
    return;
  }

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    const path = pathMap[value as TabValue];
    if (path === '') {
      navigate({ to: '/profile/$username', params: { username: user?.username } });
    } else {
      navigate({ to: `/profile/$username/${path}`, params: { username: user.username } });
    }
  };

  return (
    <Grid gutter={32}>
      <Grid.Col span={8}>
        <h1>{user?.username}</h1>
        <Tabs
          defaultValue={currentTab}
          onChange={handleTabChange}
          classNames={{ tab: classes.tab }}
          mt="md"
        >
          <Tabs.List mb="xl">
            <Tabs.Tab value="articles">My Articles</Tabs.Tab>
            <Tabs.Tab
              value="favorites"
              leftSection={<IconHeart size={16} stroke={1.5} color={theme.colors.red[6]} />}
            >
              Liked Posts
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="articles">
            <Outlet />
          </Tabs.Panel>
          <Tabs.Panel value="favorites">
            <Outlet />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
      <Grid.Col span={4} pl="xl">
        <UserAvatar
          username={user.username}
          sourceImage={user.image}
          altText={user.username}
          size={100}
          radius={120}
          color='initials'
        />
        <Text fz="lg" fw={500} mt="md">
          {user.username}
        </Text>
        <Text c="dimmed" fz="sm">
          2 followers
        </Text>
        <Button variant="transparent" pl={0} mt="md">
          Edit profile
        </Button>
        {data.length > 0 && (
          <Fragment>
            <Text fz="md" fw={500} mt="xl">
              Following
            </Text>
            <Stack
              h={300}
              bg="var(--mantine-color-body)"
              align="flex-start"
              justify="flex-start"
              gap="md"
              mt="md"
            >
              {data.map((person) => (
                <Group gap="sm">
                  <Avatar size={30} src={person.avatar} radius={30} />
                  <Text fz="sm" fw={500}>
                    {person.name}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Fragment>
        )}
      </Grid.Col>
    </Grid>
  );
}
