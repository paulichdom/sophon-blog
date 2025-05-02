import { FC } from 'react';
import { IconCheck, IconLink } from '@tabler/icons-react';
import { ActionIcon, CopyButton, Tooltip, useMantineTheme } from '@mantine/core';

type ArticleCopyButtonProps = {
  articleSlug: string;
};

export const ArticleCopyButton: FC<ArticleCopyButtonProps> = ({ articleSlug }) => {
  const theme = useMantineTheme();

  // TODO: update this with actual url when app is deployed
  const DUMMY_APP_DOMAIN = 'https://sophon-blog.com';
  const shareArticleUrl = `${DUMMY_APP_DOMAIN}/articles/${articleSlug}`;

  return (
    <CopyButton value={shareArticleUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="top">
          <ActionIcon
            color={copied ? 'teal' : theme.colors.blue[6]}
            variant="subtle"
            onClick={copy}
          >
            {copied ? <IconCheck size={20} /> : <IconLink size={20} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
