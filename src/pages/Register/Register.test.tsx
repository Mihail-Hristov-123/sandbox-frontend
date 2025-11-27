import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './register';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Login } from '../login/Login';

const registerMock = vi.fn();

vi.mock('@/hooks/useAuthService.ts', () => ({
    useAuthService: () => ({
        register: registerMock,
    }),
}));

const user = userEvent.setup();

const validRegisterData = {
    username: 'testUser123',
    email: 'testEmail@gmail.com',
    password: '12345678',
    confirmedPassword: '12345678',
};

describe('Register page', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>,
        );
    });

    it('should render the register form with all input fields', () => {
        expect(
            screen.getByRole('heading', { name: 'Create account' }),
        ).toBeInTheDocument();

        ['Username:', 'Email:', 'Password:', 'Confirm password:'].forEach(
            (label) => expect(screen.getByLabelText(label)).toBeInTheDocument(),
        );
    });

    it('should render a submit button', () => {
        expect(
            screen.getByRole('button', { name: 'Register' }),
        ).toBeInTheDocument();
    });

    it('should render a working link redirecting to Login page', async () => {
        const loginLink = screen.getByRole('link', { name: 'Log in' });
        expect(loginLink).toBeInTheDocument();

        await user.click(loginLink);

        expect(
            screen.getByRole('heading', { name: 'Log in' }),
        ).toBeInTheDocument();
    });

    it('should call the register function with the data from the inputs on submit', async () => {
        await user.type(
            screen.getByLabelText('Username:'),
            validRegisterData.username,
        );
        await user.type(
            screen.getByLabelText('Email:'),
            validRegisterData.email,
        );
        await user.type(
            screen.getByLabelText('Password:'),
            validRegisterData.password,
        );
        await user.type(
            screen.getByLabelText('Confirm password:'),
            validRegisterData.confirmedPassword,
        );

        await user.click(screen.getByRole('button', { name: 'Register' }));

        expect(registerMock).toHaveBeenCalledWith(validRegisterData);
    });
});
