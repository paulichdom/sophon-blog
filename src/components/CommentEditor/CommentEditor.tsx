import { Avatar, Button, Flex, Group, Text, Textarea } from '@mantine/core';
import classes from './CommentEditor.module.css';

export const CommentEditor = () => {
  return (
    <Flex direction="column" gap="md">
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text size="sm">Jacob Warnhalter</Text>
        </div>
      </Group>
      <Textarea
        classNames={{
          input: classes.input,
        }}
        variant="filled"
        placeholder="What are your thoughts?"
        minRows={4}
        maxRows={4}
      />
      <Flex justify="flex-end">
        <Button variant="light" radius="xl">
          Respond
        </Button>
      </Flex>
    </Flex>
  );
};
