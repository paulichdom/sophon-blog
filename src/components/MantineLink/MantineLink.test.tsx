import type { JSX } from 'react';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '../../../test-utils';
import { MantineLink } from './MantineLink';

const rootRoute = createRootRoute({
  component: Outlet,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <div>Login</div>,
});

const setup = (component: () => JSX.Element) => {
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component,
  });
  const routeTree = rootRoute.addChildren([loginRoute, testRoute]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory(),
  });
  render(<RouterProvider router={router} />);
};

describe('MantineLink', () => {
  it('renders a link with the correct href', () => {
    setup(() => <MantineLink to="/login">Click me</MantineLink>);

    const linkElement = screen.getByRole('link', { name: /click me/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
  });

  it('passes other props to the anchor element', () => {
    setup(() => (
      <MantineLink to="/login" className="my-custom-class">
        Click me
      </MantineLink>
    ));

    const linkElement = screen.getByRole('link', { name: /click me/i });
    expect(linkElement).toHaveClass('my-custom-class');
  });
});
