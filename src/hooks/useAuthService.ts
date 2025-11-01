import { useNavigate } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { Routes } from '../Routes';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import toast from 'react-hot-toast';
import { useFetch } from './useFetch';

type Logout = 'logout' | 'logout-all';

type AuthAction = 'login' | 'register' | Logout;

export const useAuthService = () => {
    const navigate = useNavigate();
    const { refresh } = useAuthContext();
    const { fetchOrLogout } = useFetch();
    const handleAuthAction = async (
        action: AuthAction,
        data?: UserLoginValues | UserRegisterValues,
    ) => {
        const result = await fetchOrLogout(`auth/${action}`, 'POST', data);
        if (result.ok) {
            await refresh();
            navigate(Routes.HOME);
            return;
        }

        try {
            const responseBody = await result.json();
            toast.error(responseBody.message);
        } catch {
            toast.error('Unknown error occurred');
        }
    };

    return {
        login: (values: UserLoginValues) => handleAuthAction('login', values),
        register: (values: UserRegisterValues) =>
            handleAuthAction('register', values),
        logout: (scope: Logout) => handleAuthAction(scope),
    };
};
