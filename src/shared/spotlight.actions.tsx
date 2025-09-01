import {
  IconBrain,
  IconCode,
  IconMovie,
  IconDeviceGamepad2,
  IconBrush,
  IconSearch,
  IconHome,
  IconUser,
  IconSettings,
  IconEdit,
} from '@tabler/icons-react';
import type { SpotlightActionData } from '@mantine/spotlight';

export const spotlightActions: SpotlightActionData[] = [
  // Categories
  {
    id: 'ai',
    label: 'AI',
    description: '123 Articles',
    onClick: () => console.log('Navigate to AI category'),
    leftSection: <IconBrain size={18} />,
    group: 'Categories',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    description: '98 Articles',
    onClick: () => console.log('Navigate to JavaScript category'),
    leftSection: <IconCode size={18} />,
    group: 'Categories',
  },
  {
    id: 'animation',
    label: 'Animation',
    description: '76 Articles',
    onClick: () => console.log('Navigate to Animation category'),
    leftSection: <IconMovie size={18} />,
    group: 'Categories',
  },
  {
    id: 'games',
    label: 'Games',
    description: '54 Articles',
    onClick: () => console.log('Navigate to Games category'),
    leftSection: <IconDeviceGamepad2 size={18} />,
    group: 'Categories',
  },
  {
    id: 'design',
    label: 'Design',
    description: '42 Articles',
    onClick: () => console.log('Navigate to Design category'),
    leftSection: <IconBrush size={18} />,
    group: 'Categories',
  },
  // Navigation
  {
    id: 'home',
    label: 'Home',
    description: 'Go to homepage',
    onClick: () => console.log('Navigate to home'),
    leftSection: <IconHome size={18} />,
    group: 'Navigation',
  },
  {
    id: 'profile',
    label: 'Profile',
    description: 'View your profile',
    onClick: () => console.log('Navigate to profile'),
    leftSection: <IconUser size={18} />,
    group: 'Navigation',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Account settings',
    onClick: () => console.log('Navigate to settings'),
    leftSection: <IconSettings size={18} />,
    group: 'Navigation',
  },
  {
    id: 'editor',
    label: 'New Article',
    description: 'Create a new article',
    onClick: () => console.log('Navigate to editor'),
    leftSection: <IconEdit size={18} />,
    group: 'Actions',
  },
  // Search placeholder
  {
    id: 'search-all',
    label: 'Search all articles...',
    description: 'Search through all published articles',
    onClick: () => console.log('Perform search'),
    leftSection: <IconSearch size={18} />,
    group: 'Search',
  },
];
