import { IconCheck, IconX } from '@tabler/icons-react';
import { Box, Center, Text } from '@mantine/core';

export const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
};
