import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Login } from './Login';
import userEvent from '@testing-library/user-event';
import { Register } from '../register/Register';

const mockedLogin = vi.fn();

vi.mock('@/hooks/useAuthService', () => ({
    useAuthService: () => ({
        logIn: mockedLogin,
    }),
}));

const user = userEvent.setup();

const validLoginData = {
    email: 'realemail@gmail.com',
    password: '12345678',
};

describe('Login page', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </MemoryRouter>,
        );
    });

    it('should render a link that redirects the user to the register page on click', async () => {
        const linkToRegister = screen.getByRole('link', { name: 'Register' });
        expect(linkToRegister).toBeInTheDocument();
        await user.click(linkToRegister);
        expect(
            screen.getByRole('heading', { name: 'Create account' }),
        ).toBeInTheDocument();
    });

    it('should render the login form with email and password input fields and a submit button', () => {
        expect(
            screen.getByRole('heading', { name: 'Log in' }),
        ).toBeInTheDocument();

        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Sign in' }),
        ).toBeInTheDocument();
    });

    it('should call the login function with the data from the form', async () => {
        await user.type(screen.getByLabelText('Email:'), validLoginData.email);
        await user.type(
            screen.getByLabelText('Password:'),
            validLoginData.password,
        );

        await user.click(screen.getByRole('button', { name: 'Sign in' }));

        expect(mockedLogin).toHaveBeenCalledWith(validLoginData);
    });
});
