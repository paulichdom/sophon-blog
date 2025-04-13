import { FC } from 'react';
import { IconInfoTriangle } from '@tabler/icons-react';
import { Alert } from '@mantine/core';

type InfoAlertProps = {
  children: string;
  title: string;
};

export const InfoAlert: FC<InfoAlertProps> = ({ title, children }) => {
  const icon = <IconInfoTriangle />;

  return (
    <Alert title={title} color="yellow" icon={icon} withCloseButton mb="lg">
      {children}
    </Alert>
  );
};
