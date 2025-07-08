import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Center, Loader } from '@mantine/core';
import { userProfileQueryOptions } from '@/api/profile/profile.queries';
import { NotFound } from '@/components/NotFound/NotFound';
import { ServerError } from '@/components/ServerError/ServerError';
import { UserProfile } from '@/components/UserProfile/UserProfile';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = Route.useParams();
  const { data, isLoading, isError } = useQuery(userProfileQueryOptions(username));

  if (isLoading) {
    return (
      <Center style={{ height: '70vh' }}>
        <Loader color="#F9D87E" />
      </Center>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  if (!data?.profile) {
    return <NotFound />;
  }

  return <UserProfile profile={data.profile} />;
}
