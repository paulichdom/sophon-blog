import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '../../../test-utils';
import { ContactIconsList } from './ContactIcons';

describe('ContactIconsList', () => {
  it('renders all contact icons', () => {
    render(<ContactIconsList />);

    // Check for Email
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hello@mantine.dev')).toBeInTheDocument();

    // Check for Phone
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+49 (800) 335 35 35')).toBeInTheDocument();

    // Check for Address
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('844 Morris Park avenue')).toBeInTheDocument();

    // Check for Working hours
    expect(screen.getByText('Working hours')).toBeInTheDocument();
    expect(screen.getByText('8 a.m. – 11 p.m.')).toBeInTheDocument();
  });
});
