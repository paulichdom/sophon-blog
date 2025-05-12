import { Avatar, Card, Divider, Group, Image, Text } from '@mantine/core';
import classes from './ArticleItem.module.css';

export const ArticleItem = () => {
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
          <Text size="xs" c="dimmed">
            •
          </Text>
          <Text size="xs" c="dimmed">
            Feb 6th
          </Text>
        </Group>
        <Text className={classes.title} mt="md" mb="md">
          The best laptop for Frontend engineers in 2022
        </Text>
        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
          technologys
        </Text>
        <Divider />
      </div>
  );
}