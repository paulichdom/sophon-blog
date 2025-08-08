import { motion } from 'motion/react';
import { CloseButton, Group, Paper, Text } from '@mantine/core';

interface ConstructionBannerProps {
  onClose: () => void;
}

export const ConstructionBanner = ({ onClose }: ConstructionBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Paper withBorder p="lg" radius="md" shadow="md" mb="md">
        <Group justify="space-between" mb="xs">
          <Text fz="md" fw={500}>
            🚧 Under construction
          </Text>
          <CloseButton mr={-9} mt={-9} onClick={onClose} />
        </Group>
        <Text c="dimmed" fz="xs">
          This app is a work in progress (beta release). We appreciate your patience and any
          feedback!
        </Text>
      </Paper>
    </motion.div>
  );
};
