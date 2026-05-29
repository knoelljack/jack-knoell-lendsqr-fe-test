import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  describe('positive', () => {
    it('marks the matching nav item with aria-current when on its route', () => {
      mockUsePathname.mockReturnValue('/users');
      render(<Sidebar />);
      const link = screen.getByRole('link', { name: /users/i });
      expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('keeps the parent nav active when on a nested route', () => {
      mockUsePathname.mockReturnValue('/users/42');
      render(<Sidebar />);
      const link = screen.getByRole('link', { name: /users/i });
      expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('renders the three nav group headings', () => {
      mockUsePathname.mockReturnValue('/dashboard');
      render(<Sidebar />);
      expect(screen.getByText('Customers')).toBeInTheDocument();
      expect(screen.getByText('Businesses')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('negative', () => {
    it('does not mark any item active on an unrelated path', () => {
      mockUsePathname.mockReturnValue('/unrelated-path');
      render(<Sidebar />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).not.toHaveAttribute('aria-current');
      });
    });
  });
});
