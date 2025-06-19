import { FC } from 'react';
import { IconCheck, IconLink } from '@tabler/icons-react';
import { ActionIcon, CopyButton, Tooltip, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ArticleCopyButtonMessage } from './ArticleCopyButtonMessage';

type ArticleCopyButtonProps = {
  articleSlug: string;
  timeout: number;
};

export const ArticleCopyButton: FC<ArticleCopyButtonProps> = ({ articleSlug, timeout }) => {
  const theme = useMantineTheme();

  // TODO: update this with actual url when app is deployed
  const DUMMY_APP_DOMAIN = 'https://sophon-blog.com';
  const shareArticleUrl = `${DUMMY_APP_DOMAIN}/articles/${articleSlug}`;

  const handleCopy = (copy: () => void) => {
    copy();

    notifications.show({
      loading: false,
      message: <ArticleCopyButtonMessage message="Copied link to clipboard" />,
      autoClose: timeout,
      withCloseButton: true,
    });
  };

  return (
    <CopyButton value={shareArticleUrl} timeout={timeout}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="top">
          <ActionIcon
            size="sm"
            color={copied ? 'teal' : '#D3D3D3'}
            variant="subtle"
            onClick={() => handleCopy(copy)}
          >
            {copied ? <IconCheck size={16} /> : <IconLink size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
