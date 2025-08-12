import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import { GoogleButton } from './GoogleButton';

describe('GoogleButton', () => {
  it('renders a button with the Google icon and children', () => {
    render(<GoogleButton>Sign in with Google</GoogleButton>);

    const button = screen.getByRole('button', { name: /sign in with google/i });
    expect(button).toBeInTheDocument();

    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('passes through other props', () => {
    render(<GoogleButton disabled>Sign in with Google</GoogleButton>);
    const button = screen.getByRole('button', { name: /sign in with google/i });
    expect(button).toBeDisabled();
  });
});
