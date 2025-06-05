import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { loginMutationOptions } from '@/auth/auth.mutations';
import { useAuthStore } from '@/auth/auth.store';
import { LoginFormValues } from './LoginForm';

type UseLoginFormValues = {
  loginError: string | null;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: () => void;
};

export const useLoginForm = (form: UseFormReturnType<LoginFormValues>): UseLoginFormValues => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { mutate: loginUser, isPending: loginUserPending } = useMutation(loginMutationOptions());
  const { setAuth } = useAuthStore();

  const handleSubmit = () => {
    const loginUserNotificationId = notifications.show({
      loading: true,
      title: 'Login',
      message: 'Logging you in',
      autoClose: false,
      withCloseButton: false,
    });

    const loginUserDto = {
      user: {
        ...form.values,
      },
    };

    loginUser(loginUserDto, {
      onSuccess: (user) => {
        setAuth(user);

        notifications.update({
          id: loginUserNotificationId,
          color: 'teal',
          title: 'Login successful',
          message: 'Welcome back to Sophon',
          loading: false,
          autoClose: 2000,
        });

        navigate({ to: '/' });
      },
      onError: (error) => {
        setLoginError(error.message);
        form.setErrors({ email: '', password: '' });

        notifications.update({
          id: loginUserNotificationId,
          color: 'red',
          title: 'Login error',
          message: error.message,
          loading: false,
          autoClose: 2000,
        });
      },
    });
  };

  return {
    loginError,
    setLoginError,
    handleSubmit,
  };
};
