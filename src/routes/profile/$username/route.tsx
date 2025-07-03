import { IconHeart, IconUserMinus, IconUserPlus } from '@tabler/icons-react';
import { createFileRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, Divider, Grid, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { userProfileQueryOptions } from '@/api/profile/profile.queries';
import { useAuthStore } from '@/auth/auth.store';
import { AuthModalGuard } from '@/components/AuthModalGuard/AuthModalGuard';
import { AuthShow } from '@/components/AuthShow/AuthShow';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { useFollowUserProfile } from '@/hooks/use-follow-user-profile';
import classes from '../../../components/UserInfo/UserInfo.module.css';

export const Route = createFileRoute('/profile/$username')({
  loader: async ({ context: { queryClient }, params: { username } }) => {
    return await queryClient.ensureQueryData(userProfileQueryOptions(username));
  },
  component: RouteComponent,
});

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
  const { accessToken, user } = useAuthStore();

  const [authModalOpened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);

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

  const {
    followingState,
    handleFollowUserProfile,
    followUserProfileIsPending,
    unfollowUserProfileIsPending,
  } = useFollowUserProfile(profile.username, profile.following);

  const onFollowUserProfile = () => {
    if (isAuthenticated) {
      handleFollowUserProfile();
    } else {
      openAuthModal();
    }
  };

  const isAuthenticated = !!accessToken && !!user;
  const isCurrentUser = user?.username === profile?.username;
  const shouldShowFollowButton = !isAuthenticated || (isAuthenticated && !isCurrentUser);

  console.log({ isAuthenticated, isCurrentUser, shouldShowFollowButton });

  const hasFollowers = profile.followers && profile.followers?.length > 0;
  const followersCountLabel = profile.followers?.length === 1 ? 'follower' : 'followers';

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
              Liked Articles
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
        {!hasFollowers && (
          <Text c="dimmed" fz="sm">
            No followers yet
          </Text>
        )}
        {hasFollowers && (
          <Text c="dimmed" fz="sm">
            {profile.followers?.length} {followersCountLabel}
          </Text>
        )}
        <Text fz="md" mt="md">
          Bio:
        </Text>
        {!profile.bio && (
          <Text c="dimmed" fz="sm">
            No bio yet
          </Text>
        )}
        {profile.bio && (
          <Text c="dimmed" fz="sm" mt="md" mb="sm">
            {profile.bio}
          </Text>
        )}
        {shouldShowFollowButton && (
          <Button
            size="sm"
            radius="xl"
            mt="md"
            variant="filled"
            color={theme.colors.dark[4]}
            leftSection={followingState ? <IconUserMinus size={20} /> : <IconUserPlus size={20} />}
            onClick={onFollowUserProfile}
            loading={followUserProfileIsPending || unfollowUserProfileIsPending}
          >
            {followingState ? 'Unfollow' : 'Follow'}
          </Button>
        )}
        {isCurrentUser && (
          <AuthShow when="isOwner" ownerUsername={user?.username}>
            <Button variant="transparent" pl={0} mt="md">
              Edit profile
            </Button>
          </AuthShow>
        )}
      </Grid.Col>
      <AuthModalGuard opened={authModalOpened} onClose={closeAuthModal} />
    </Grid>
  );
}
