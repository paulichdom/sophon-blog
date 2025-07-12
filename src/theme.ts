import cx from 'clsx';
import { Container, createTheme } from '@mantine/core';
import classes from './theme.module.css';

export const theme = createTheme({
  colors: {
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#12141C', // dark mode default background
      '#141517',
      '#101113',
    ],
  },
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});
