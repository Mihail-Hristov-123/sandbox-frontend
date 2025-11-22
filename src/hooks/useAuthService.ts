import { createApiRoute } from '@/utils/createApiRoute';
import { useAuthContext } from '../contexts/auth/useAuthContext';

import { useApi } from './useApi';
import { SERVER_ROUTES } from '@/routes';
import toast from 'react-hot-toast';
import type { LoginValues, RegisterValues } from 'tacklebox-schemas';

export type LogoutScope = 'thisDevice' | 'allDevices';

export const useAuthService = () => {
    const { fetchWithAuthCheck } = useApi();
    const { setIsLoggedIn } = useAuthContext();

    const logIn = async (data: LoginValues) => {
        try {
            const response = await fetchWithAuthCheck(
                createApiRoute(SERVER_ROUTES.LOGIN),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                },
            );

            if (response.ok) {
                setIsLoggedIn(true);
                return;
            }

            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during login');
        }
    };
    const logOut = async (logoutScope: LogoutScope) => {
        const response = await fetch(
            createApiRoute(
                SERVER_ROUTES[
                    logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL'
                ],
            ),
            { method: 'POST' },
        );

        if (response.ok) {
            setIsLoggedIn(false);
            return;
        }
        toast.error('Error occurred during logout');
    };
    const register = async (data: RegisterValues) => {
        try {
            const response = await fetch(
                createApiRoute(SERVER_ROUTES.REGISTER),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                },
            );
            if (response.ok) {
                setIsLoggedIn(true);
                return;
            }

            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during registration');
        }
    };

    return { logIn, logOut, register };
};
