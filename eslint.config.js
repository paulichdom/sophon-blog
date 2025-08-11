import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Global ignores should come first
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '**/*.{mjs,cjs,js,d.ts,d.mts}',
      './.storybook/main.ts',
      './src/routeTree.gen.ts',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  ...mantine,
  {},
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Warn about unused imports specifically
      'no-unused-vars': 'off', // Turn off the base rule as it conflicts with the TypeScript rule
    },
  }
);
