import { IconHeart, IconUserMinus, IconUserPlus } from '@tabler/icons-react';
import { Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, Grid, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/auth/auth.store';
import { AuthModalGuard } from '@/components/AuthModalGuard/AuthModalGuard';
import { AuthShow } from '@/components/AuthShow/AuthShow';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { useFollowUserProfile } from '@/hooks/use-follow-user-profile';
import { ProfileData } from '@/types/types';
import classes from './UserProfile.module.css';

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

type UserProfileProps = {
  profile: ProfileData;
};

export const UserProfile = ({ profile }: UserProfileProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const router = useRouter();

  const { username, image, bio, following, followers } = profile;

  const { accessToken, user } = useAuthStore();

  const [authModalOpened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);

  const pathSegments = router.state.location.pathname.split('/');
  const currentPath = pathSegments.length > 2 ? pathSegments[2] : '';

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

  const {
    followingState,
    handleFollowUserProfile,
    followUserProfileIsPending,
    unfollowUserProfileIsPending,
  } = useFollowUserProfile(username, following);

  const onFollowUserProfile = () => {
    if (isAuthenticated) {
      handleFollowUserProfile();
    } else {
      openAuthModal();
    }
  };

  const isAuthenticated = !!accessToken && !!user;
  const isCurrentUser = user?.username === username;
  const shouldShowFollowButton = !isAuthenticated || (isAuthenticated && !isCurrentUser);

  const hasFollowers = followers && followers.length > 0;
  const followersCountLabel = followers?.length === 1 ? 'follower' : 'followers';

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
          username={username}
          sourceImage={image}
          altText={username}
          size={100}
          radius={120}
          color="initials"
        />
        <Text fz="lg" fw={500} mt="md">
          {username}
        </Text>
        {!hasFollowers && (
          <Text c="dimmed" fz="sm">
            No followers yet
          </Text>
        )}
        {hasFollowers && (
          <Text c="dimmed" fz="sm">
            {followers?.length} {followersCountLabel}
          </Text>
        )}
        <Text fz="md" mt="md">
          Bio:
        </Text>
        {bio && (
          <Text c="dimmed" fz="sm">
            No bio yet
          </Text>
        )}
        {bio && (
          <Text c="dimmed" fz="sm" mt="md" mb="sm">
            {bio}
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
};
