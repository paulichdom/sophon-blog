import { FC } from 'react';
import { IconCheck, IconLink } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ArticleCopyButtonMessage } from './ArticleCopyButtonMessage';
import classes from './Article.module.css';

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
  const APP_DOMAIN = 'https://sophon.up.railway.app';
  const shareArticleUrl = `${APP_DOMAIN}/article/${articleSlug}`;

  const handleCopy = (copy: () => void, copied: boolean) => {
    if (copied) {
      return;
    }

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
          <motion.div whileHover={{ scale: 1.4 }} className={classes.copyButtonWrapper}>
            <ActionIcon
              size="sm"
              color={copied ? 'teal' : '#D3D3D3'}
              variant="transparent"
              onClick={() => handleCopy(copy, copied)}
            >
              {copied ? <IconCheck size={iconSize} /> : <IconLink size={iconSize} />}
            </ActionIcon>
          </motion.div>
        </Tooltip>
      )}
    </CopyButton>
  );
};
