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
    <Alert
      /* TODO: Move custom styling to css module */
      style={{ width: '100%' }}
      title={title}
      color="yellow"
      icon={icon}
      withCloseButton
      mb="lg"
    >
      {children}
    </Alert>
  );
};
