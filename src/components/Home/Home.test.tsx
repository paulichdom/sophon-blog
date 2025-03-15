import { render, screen } from '@test-utils';
import { Home } from './Home';

describe('Welcome component', () => {
  it('has correct Vite guide link', () => {
    render(<Home />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
