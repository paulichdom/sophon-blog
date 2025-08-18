import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '../../../test-utils';
import { InfoAlert } from './InfoAlert';

describe('InfoAlert', () => {
  it('renders the title and children', () => {
    const title = 'Test Title';
    const message = 'Test message';

    render(<InfoAlert title={title}>{message}</InfoAlert>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
