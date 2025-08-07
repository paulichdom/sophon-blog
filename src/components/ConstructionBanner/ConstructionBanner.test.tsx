import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { render } from '../../../test-utils';
import { ConstructionBanner } from './ConstructionBanner';

describe('ConstructionBanner', () => {
  it('renders the banner text and title', () => {
    const handleClose = vi.fn();
    render(<ConstructionBanner onClose={handleClose} />);

    expect(screen.getByText('🚧 Under construction')).toBeInTheDocument();
    expect(
      screen.getByText('This app is a work in progress (beta release). We appreciate your patience and any feedback!')
    ).toBeInTheDocument();
  });

  it('calls the onClose handler when the close button is clicked', () => {
    const handleClose = vi.fn();
    render(<ConstructionBanner onClose={handleClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
