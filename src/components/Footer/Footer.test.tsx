import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SOURCE_CODE_URL } from '@/shared/constants';
import { render } from '../../../test-utils';
import { Footer } from './Footer';

const rootRoute = createRootRoute({
  component: Footer,
});

const router = createRouter({
  routeTree: rootRoute,
  history: createMemoryHistory(),
});

describe('Footer', () => {
  beforeEach(() => {
    render(<RouterProvider router={router} />);
  });

  it('renders the footer', () => {
    const logo = screen.getByText('Sophon');
    expect(logo).toBeInTheDocument();
  });

  it('renders the logo link and source code button with correct hrefs', () => {
    const logoLink = screen.getByRole('link', { name: /sophon/i });
    const sourceCodeButton = screen.getByRole('link', { name: /source code/i });

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(sourceCodeButton).toBeInTheDocument();
    expect(sourceCodeButton).toHaveAttribute('href', SOURCE_CODE_URL);
  });
});
