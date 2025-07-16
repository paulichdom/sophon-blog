import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/auth/auth.store';
import { Settings } from '@/components/Settings/Settings';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, setUser } = useAuthStore();

  if (!user) {
    return redirect({ to: '/login' });
  }

  return <Settings user={user} setUser={setUser} />;
}
