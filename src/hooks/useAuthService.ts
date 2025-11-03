import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';
import { displayErrorToast } from '../utils/displayErrorToast';

export const useAuthService = () => {
    const { makeApiRequest } = useApi();

    const logIn = async (data: UserLoginValues) => {
        const result = await makeApiRequest({
            method: 'POST',
            path: 'LOGIN',
            body: data,
        });
        displayErrorToast(result, 'Login failed');
    };
    const logOut = async (logoutScope: 'thisDevice' | 'allDevices') => {
        await makeApiRequest({
            path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
            method: 'POST',
        });
    };
    const register = async (data: UserRegisterValues) => {
        const result = await makeApiRequest({
            path: 'REGISTER',
            method: 'POST',
            body: data,
        });
        displayErrorToast(result, 'Registration failed');
    };

    return { logIn, logOut, register };
};
