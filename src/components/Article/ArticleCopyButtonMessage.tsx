import { IconLink } from '@tabler/icons-react';
import { Flex, Text } from '@mantine/core';

export const ArticleCopyButtonMessage = ({ message }: { message: string }) => {
  return (
    <Flex align="center" gap="sm">
      <IconLink />
      <Text fw={500} mb={2}>
        {message}
      </Text>
    </Flex>
  );
};
