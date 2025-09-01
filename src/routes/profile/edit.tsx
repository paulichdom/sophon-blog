import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Center } from '@mantine/core';
import { userProfileQueryOptions } from '@/api/profile/profile.queries';
import { useAuthStore } from '@/auth/auth.store';
import { NotFound } from '@/components/NotFound/NotFound';
import { ServerError } from '@/components/ServerError/ServerError';
import { SpiralLoader } from '@/components/SpiralLoader/SpiralLoader';
import { UserProfileEdit } from '@/components/UserProfileEdit/UserProfileEdit';

export const Route = createFileRoute('/profile/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, setUser } = useAuthStore();

  if (!user) {
    return redirect({ to: '/login' });
  }

  const { data, isLoading, isError } = useQuery(userProfileQueryOptions(user.username));

  if (isLoading) {
    return (
      <Center style={{ height: '70vh' }}>
        <SpiralLoader />
      </Center>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  if (!data?.profile) {
    return <NotFound />;
  }

  return <UserProfileEdit profile={data.profile} user={user} setUser={setUser} />;
}
