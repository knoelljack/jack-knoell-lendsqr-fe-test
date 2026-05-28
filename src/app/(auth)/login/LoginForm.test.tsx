import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('LoginForm', () => {
  describe('positive', () => {
    it('submits with the typed values when email and password are valid', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<LoginForm onSubmit={onSubmit} />);

      await user.type(screen.getByPlaceholderText('Email'), 'jane@lendsqr.com');
      await user.type(screen.getByPlaceholderText('Password'), 'correct horse');
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(onSubmit).toHaveBeenCalledWith({
        email: 'jane@lendsqr.com',
        password: 'correct horse',
      });
    });

    it('toggles password visibility when Show is pressed', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      const password = screen.getByPlaceholderText('Password');
      expect(password).toHaveAttribute('type', 'password');

      await user.click(screen.getByRole('button', { name: /show password/i }));
      expect(password).toHaveAttribute('type', 'text');

      await user.click(screen.getByRole('button', { name: /hide password/i }));
      expect(password).toHaveAttribute('type', 'password');
    });
  });

  describe('negative', () => {
    it('does not submit and shows required errors when fields are empty', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<LoginForm onSubmit={onSubmit} />);

      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(await screen.findByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not submit and shows a format error for an invalid email', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<LoginForm onSubmit={onSubmit} />);

      await user.type(screen.getByPlaceholderText('Email'), 'not-an-email');
      await user.type(screen.getByPlaceholderText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not submit and shows a min-length error for a short password', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<LoginForm onSubmit={onSubmit} />);

      await user.type(screen.getByPlaceholderText('Email'), 'jane@lendsqr.com');
      await user.type(screen.getByPlaceholderText('Password'), 'short');
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(
        await screen.findByText('Password must be at least 6 characters'),
      ).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
