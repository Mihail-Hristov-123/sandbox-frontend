import toast from 'react-hot-toast';
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
        if (!result.ok) {
            toast.error(result.body.message);
            return;
        }
        setIsLoggedIn(true);
    };
    const logOut = async (logoutScope: LogoutScope) => {
        const response = await fetchWithAuthCheck({
            path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
            method: 'POST',
        });

        if (!response.ok) {
            toast.error(response.body.message);
            return;
        }
        setIsLoggedIn(false);
    };
    const register = async (data: UserRegisterValues) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            path: 'REGISTER',
            body: data,
        });
        if (!result.ok) {
            toast.error(result.body.message);
            return;
        }

        setIsLoggedIn(true);
    };

    return { logIn, logOut, register };
};
