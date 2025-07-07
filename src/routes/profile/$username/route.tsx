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
  const { data, isLoading, isError, error } = useQuery(userProfileQueryOptions(username));

  if (isLoading) {
    return (
      <Center>
        <Loader color="yellow" size="xl" type="dots" />
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
