import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classes from './ArticleCard.module.css';
import { FC } from 'react';

type ArticleCardProps = {
  title: string;
  image: string;
  alt: string;
  date: string;
  avatar: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({title, image, alt, date, avatar }) => {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={image}
          alt={alt}
          height={180}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        decorations
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {title}
      </Text>

      <Group mt="lg">
        <Avatar
          src={avatar}
          radius="sm"
        />
        <div>
          <Text fw={500}>Elsa Gardenowl</Text>
          <Text fz="xs" c="dimmed">
            posted 34 minutes ago
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}