import { useNavigate } from 'react-router';
import { accessAuthAPI } from '../utils/accessAuthAPI';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { Routes } from '../Routes';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';

type Logout = 'logout' | 'logout-all';

type AuthAction = 'login' | 'register' | Logout;

export const useAuthService = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuthContext();

    const handleAuthAction = async (
        action: AuthAction,
        data?: UserLoginValues | UserRegisterValues,
    ) => {
        const success = await accessAuthAPI(action, data);

        if (success) {
            const isLoginAction = action === 'login' || action === 'register';
            setIsLoggedIn(isLoginAction);
            navigate(Routes.HOME);
        }

        return success;
    };

    return {
        login: (values: UserLoginValues) => handleAuthAction('login', values),
        register: (values: UserRegisterValues) =>
            handleAuthAction('register', values),
        logout: (scope: Logout) => handleAuthAction(scope),
    };
};
