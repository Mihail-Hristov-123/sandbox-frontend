import { createApiRoute } from '@/utils/createApiRoute';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';
import { SERVER_ROUTES } from '@/routes';
import toast from 'react-hot-toast';

export type LogoutScope = 'thisDevice' | 'allDevices';

export const useAuthService = () => {
    const { fetchWithAuthCheck } = useApi();
    const { setIsLoggedIn } = useAuthContext();

    const logIn = async (data: UserLoginValues) => {
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
        try {
            await fetch(
                createApiRoute(
                    SERVER_ROUTES[
                        logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL'
                    ],
                ),
                { method: 'POST' },
            );
            setIsLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };
    const register = async (data: UserRegisterValues) => {
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
