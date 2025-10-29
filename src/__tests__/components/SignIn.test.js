import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from "../../components/SignIn";

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        render(<SignInForm onSubmit={onSubmit} />);

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
        fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
            // Expect onSubmit to have been called once
            expect(onSubmit).toHaveBeenCalledTimes(1);
            // Expect onSubmit to have been called with the correct username and password
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'testuser',
                password: 'password123',
            });
      });
    });
  });
});