import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';

export const useAuthService = () => {
    const { makeApiRequest } = useApi();

    const logIn = async (data: UserLoginValues) =>
        await makeApiRequest({ method: 'POST', path: 'LOGIN', body: data });
    const logOut = async (logoutScope: 'thisDevice' | 'allDevices') => {
        await makeApiRequest({
            path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
            method: 'POST',
        });
    };
    const register = async (data: UserRegisterValues) => {
        await makeApiRequest({ path: 'REGISTER', method: 'POST', body: data });
    };

    return { logIn, logOut, register };
};
