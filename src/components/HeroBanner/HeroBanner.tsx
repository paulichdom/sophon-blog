import { FC } from 'react';
import { Box, Text, Center } from '@mantine/core';
import classes from './HeroBanner.module.css';

export const HeroBanner: FC = () => {
  return (
    <Box className={classes.heroBanner}>
      <div className={classes.overlay} />
      <Center className={classes.content}>
        <div className={classes.innerContent}>
          {/* Main Title */}
          <Text className={classes.title}>
            Sophon
          </Text>
          
          {/* Subtitle */}
          <Text className={classes.subtitle}>
            Unveiling the Mechanisms of Knowledge.
          </Text>
        </div>
      </Center>
    </Box>
  );
};
