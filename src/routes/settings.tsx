import { createFileRoute, redirect } from '@tanstack/react-router';
import { currentUserQueryOptions } from '@/auth/auth.queries';
import { Settings } from '@/components/Settings/Settings';
import { queryClient } from '@/queryClient';

export const Route = createFileRoute('/settings')({
  beforeLoad: async () => {
    try {
      const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions);
      if (!currentUser) throw redirect({ to: '/login' });
    } catch (error) {
      throw redirect({ to: '/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Settings />;
}
