export type CategoryOption = {
  label: string;
  value: string;
  description: string;
};

export const DEFAULT_CATEGORY_VALUE = 'general';

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    label: 'All Topics',
    value: DEFAULT_CATEGORY_VALUE,
    description: 'Latest drops from every Sophon editor.',
  },
  {
    label: 'CSS Systems',
    value: 'css',
    description: 'Layered tokens, utilities, and layout strategies.',
  },
  {
    label: 'React Patterns',
    value: 'react',
    description: 'Hooks, RSC, and resilient UI flows.',
  },
  {
    label: 'Animation',
    value: 'animation',
    description: 'Motion cues, easing, and focus choreography.',
  },
  {
    label: 'Career',
    value: 'career',
    description: 'Intentional growth paths for makers.',
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    description: 'Runtime insights and DX shortcuts.',
  },
  {
    label: 'SVG Craft',
    value: 'svg',
    description: 'Vector artistry for dashboards and data.',
  },
  {
    label: 'Next.js',
    value: 'nextjs',
    description: 'Edge-native deployments and hybrid rendering.',
  },
];
