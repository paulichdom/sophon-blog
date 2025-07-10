import { FC } from 'react';
import { IconCheck, IconLink } from '@tabler/icons-react';
import { ActionIcon, CopyButton, Tooltip, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ArticleCopyButtonMessage } from './ArticleCopyButtonMessage';

type ArticleCopyButtonProps = {
  articleSlug: string;
  timeout: number;
  iconSize: number;
};

export const ArticleCopyButton: FC<ArticleCopyButtonProps> = ({
  articleSlug,
  timeout,
  iconSize,
}) => {
  const theme = useMantineTheme();

  const APP_DOMAIN = 'https://sophon.up.railway.app';
  const shareArticleUrl = `${APP_DOMAIN}/article/${articleSlug}`;

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
            {copied ? <IconCheck size={iconSize} /> : <IconLink size={iconSize} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
