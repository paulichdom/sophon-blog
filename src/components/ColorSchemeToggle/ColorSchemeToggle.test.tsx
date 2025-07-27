import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMantineColorScheme } from '@mantine/core';
import { render } from '../../../test-utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';

// Mock the useMantineColorScheme hook
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    useMantineColorScheme: vi.fn(),
  };
});

const mockedUseMantineColorScheme = vi.mocked(useMantineColorScheme);

describe('ColorSchemeToggle', () => {
  it('calls toggleColorScheme when the button is clicked', () => {
    const toggleColorScheme = vi.fn();
    const setColorScheme = vi.fn();
    const clearColorScheme = vi.fn();

    mockedUseMantineColorScheme.mockReturnValue({
      colorScheme: 'light',
      toggleColorScheme,
      setColorScheme,
      clearColorScheme,
    });

    render(<ColorSchemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle color scheme/i });
    fireEvent.click(toggleButton);

    expect(toggleColorScheme).toHaveBeenCalledTimes(1);
  });
});
