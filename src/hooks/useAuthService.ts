import { useAuthContext } from '../contexts/auth/useAuthContext';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';

export type LogoutScope = 'thisDevice' | 'allDevices';

export const useAuthService = () => {
    const { fetchWithAuthCheck } = useApi();
    const { setIsLoggedIn } = useAuthContext();

    const logIn = async (data: UserLoginValues) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            path: 'LOGIN',
            body: data,
        });

        if (result && result.ok) setIsLoggedIn(true);
    };
    const logOut = async (logoutScope: LogoutScope) => {
        const result = await fetchWithAuthCheck({
            path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
            method: 'POST',
        });

        if (result && result.ok) setIsLoggedIn(false);
    };
    const register = async (data: UserRegisterValues) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            path: 'REGISTER',
            body: data,
        });
        if (result && result.ok) setIsLoggedIn(true);
    };

    return { logIn, logOut, register };
};
