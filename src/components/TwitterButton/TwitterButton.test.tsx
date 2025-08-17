import { render, screen } from '@test-utils';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { TwitterButton } from './TwitterButton';

describe('TwitterButton', () => {
  it('renders correctly', () => {
    render(<TwitterButton>Follow us</TwitterButton>);
    expect(screen.getByRole('button', { name: /Follow us/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<TwitterButton onClick={handleClick}>Follow us</TwitterButton>);
    await userEvent.click(screen.getByRole('button', { name: /Follow us/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
