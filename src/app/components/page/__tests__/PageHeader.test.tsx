
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

// Mocking Next.js's useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
}));

describe('PageHeader Component', () => {
  it('should render the header with title, navigation, and login button', () => {
    render(<PageHeader />);

    // Check for the title
    const title = screen.getByText('CDA Moto GP');
    expect(title).toBeInTheDocument();

    // Check for navigation links
    const inicioLink = screen.getByRole('link', { name: /inicio/i });
    expect(inicioLink).toBeInTheDocument();

    const nosotrosLink = screen.getByRole('link', { name: /nosotros/i });
    expect(nosotrosLink).toBeInTheDocument();

    const serviciosLink = screen.getByRole('link', { name: /servicios/i });
    expect(serviciosLink).toBeInTheDocument();

    const contactanosLink = screen.getByRole('link', { name: /contactanos/i });
    expect(contactanosLink).toBeInTheDocument();

    // Check for the login button
    const loginButton = screen.getByRole('button', { name: /ingresar/i });
    expect(loginButton).toBeInTheDocument();
  });
});
