import { FC, ReactNode } from 'react';
import { useAuthStore } from '@/auth/auth.store';

type AuthShowProps = {
  when: 'loggedIn' | 'loggedOut';
  fallback?: ReactNode;
  children: ReactNode;
};

export const AuthShow: FC<AuthShowProps> = ({ when, fallback = null, children }) => {
  const { accessToken } = useAuthStore();
  const shouldShow = when === 'loggedIn' ? !!accessToken : !accessToken;
  return <>{shouldShow ? children : fallback}</>;
};
