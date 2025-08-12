import { render, screen } from '@test-utils';
import { vi } from 'vitest';
import { TwitterButton } from './TwitterButton';

describe('TwitterButton', () => {
  it('renders correctly', () => {
    render(<TwitterButton>Follow us</TwitterButton>);
    expect(screen.getByRole('button', { name: /Follow us/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<TwitterButton onClick={handleClick}>Follow us</TwitterButton>);
    screen.getByRole('button', { name: /Follow us/i }).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
