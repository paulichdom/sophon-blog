import { useState } from 'react';
import {
  IconBookmark,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Center,
  Divider,
  Group,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ArticleCopyButton } from '../Article/ArticleCopyButton';
import classes from './ArticleItem.module.css';

const description =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

export const ArticleItem = () => {
  const theme = useMantineTheme();

  const [favoritedState] = useState<boolean>(false);
  const IconFavorited = favoritedState ? IconHeartFilled : IconHeart;

  return (
    <div className={classes.body}>
      <Group wrap="nowrap" gap="xs">
        <Group gap="xs" wrap="nowrap">
          <Avatar
            size={20}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          />
          <Text size="xs">Elsa Typechecker</Text>
        </Group>
      </Group>
      <Text lineClamp={2} truncate="end" className={classes.title} mt="md" mb="md">
        The best laptop for Frontend engineers in 2022
      </Text>
      <Text lineClamp={2} c="dimmed" truncate="end" mb="lg">
        {description}
      </Text>
      <Group gap={'lg'}>
        <Text size="xs" c="dimmed">
          Feb 6th
        </Text>
        <Center>
          <IconMessageCircle size={16} stroke={1.5} color={theme.colors.dark[2]} />
          <Text size="sm" className={classes.bodyText}>
            5
          </Text>
        </Center>
        <Center>
          <IconEye size={16} stroke={1.5} color={theme.colors.dark[2]} />
          <Text size="sm" className={classes.bodyText}>
            7847
          </Text>
        </Center>
        {/*         <ActionIcon variant="subtle" color="gray">
          <IconFavorited size={20} color={theme.colors.red[6]} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="gray">
          <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
        </ActionIcon>
        <ArticleCopyButton articleSlug={'placeholder'} /> */}
      </Group>
      <Divider mt="md" mb="lg" />
    </div>
  );
};
