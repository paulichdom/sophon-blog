import { FC, ReactNode } from 'react';
import { useAuthStore } from '@/auth/auth.store';

type AuthShowProps = {
  when: 'loggedIn' | 'loggedOut' | 'isOwner';
  fallback?: ReactNode;
  children: ReactNode;
  ownerUsername?: string;
};

export const AuthShow: FC<AuthShowProps> = ({ when, fallback = null, children, ownerUsername }) => {
  const { accessToken, user } = useAuthStore();
  let shouldShow = false;
  if (when === 'loggedIn') {
    shouldShow = !!accessToken;
  } else if (when === 'loggedOut') {
    shouldShow = !accessToken;
  } else if (when === 'isOwner') {
    shouldShow = !!user && !!accessToken && !!ownerUsername && user.username === ownerUsername;
  }
  return <>{shouldShow ? children : fallback}</>;
};
