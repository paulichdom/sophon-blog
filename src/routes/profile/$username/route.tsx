import { IconHeart, IconUserPlus } from '@tabler/icons-react';
import { createFileRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, Grid, Tabs, Text, useMantineTheme } from '@mantine/core';
import { userProfileQueryOptions } from '@/api/profile/profile.queries';
import { AuthShow } from '@/components/AuthShow/AuthShow';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import classes from '../../../components/UserInfo/UserInfo.module.css';

export const Route = createFileRoute('/profile/$username')({
  loader: async ({ context: { queryClient }, params: { username } }) => {
    return await queryClient.ensureQueryData(userProfileQueryOptions(username));
  },
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
  const { profile } = Route.useLoaderData();

  const hasFollowers = profile.followers && profile.followers?.length > 0;

  // Extract the path segment after the username
  const pathSegments = router.state.location.pathname.split('/');
  const currentPath = pathSegments.length > 3 ? pathSegments[3] : '';

  const currentTab = tabMap[currentPath as TabKey] || 'articles';

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    const path = pathMap[value as TabValue];
    if (path === '') {
      navigate({ to: '/profile/$username', params: { username: profile.username } });
    } else {
      navigate({ to: `/profile/$username/${path}`, params: { username: profile.username } });
    }
  };

  return (
    <Grid gutter={32}>
      <Grid.Col span={8}>
        <h1>{profile.username}</h1>
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
          username={profile.username}
          sourceImage={profile.image}
          altText={profile.username}
          size={100}
          radius={120}
          color="initials"
        />
        <Text fz="lg" fw={500} mt="md">
          {profile.username}
        </Text>
        {hasFollowers && (
          <Text c="dimmed" fz="sm">
            {profile.followers?.length} followers
          </Text>
        )}

        <Button
          size="sm"
          radius="xl"
          mt="md"
          variant="outline"
          color="#F9D87E"
          leftSection={<IconUserPlus size={20} />}
        >
          Follow
        </Button>
        <AuthShow when="isOwner">
          <Button variant="transparent" pl={0} mt="md">
            Edit profile
          </Button>
        </AuthShow>
        {/* TODO: expose following data and display it here */}
        {/* {data.length > 0 && (
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
        )} */}
      </Grid.Col>
    </Grid>
  );
}
