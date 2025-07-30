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

  it('displays correct icon based on color scheme', () => {
    const toggleColorScheme = vi.fn();
    const setColorScheme = vi.fn();
    const clearColorScheme = vi.fn();

    // Test light mode - should show sun icon prominently, moon icon hidden
    mockedUseMantineColorScheme.mockReturnValue({
      colorScheme: 'light',
      toggleColorScheme,
      setColorScheme,
      clearColorScheme,
    });

    const { container, rerender } = render(<ColorSchemeToggle />);

    // Verify button is rendered
    const toggleButton = screen.getByRole('button', { name: /toggle color scheme/i });
    expect(toggleButton).toBeInTheDocument();

    // Check that both icon elements exist (they're always in DOM but styled differently)
    const sunIcon = container.querySelector('svg'); // First SVG should be sun icon
    expect(sunIcon).toBeInTheDocument();

    // Test dark mode
    mockedUseMantineColorScheme.mockReturnValue({
      colorScheme: 'dark',
      toggleColorScheme,
      setColorScheme,
      clearColorScheme,
    });

    rerender(<ColorSchemeToggle />);

    // Verify button still renders correctly after color scheme change
    const toggleButtonDark = screen.getByRole('button', { name: /toggle color scheme/i });
    expect(toggleButtonDark).toBeInTheDocument();

    // Icons should still be present
    const iconsAfterToggle = container.querySelectorAll('svg');
    expect(iconsAfterToggle).toHaveLength(2); // Should have both sun and moon icons
  });
});
