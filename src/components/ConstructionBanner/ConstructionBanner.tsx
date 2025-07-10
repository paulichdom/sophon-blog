import { Button, CloseButton, Group, Paper, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

export const ConstructionBanner = () => {
  const [shouldHideBanner, setHideBanner] = useLocalStorage({
    key: 'construction-banner-hidden',
    defaultValue: false,
  });

  const hideBanner = () => {
    setHideBanner(true);
  };

  if (shouldHideBanner) {
    return null;
  }

  return (
    <Paper withBorder p="lg" radius="md" shadow="md" mb="md">
      <Group justify="space-between" mb="xs">
        <Text fz="md" fw={500}>
          🚧 Under construction
        </Text>
        <CloseButton mr={-9} mt={-9} onClick={hideBanner} />
      </Group>
      <Text c="dimmed" fz="xs">
        This app is a work in progress (beta release). We appreciate your patience and any feedback!
      </Text>
    </Paper>
  );
};
