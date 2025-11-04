import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';
import toast from 'react-hot-toast';

export const useAuthService = () => {
    const { fetchWithAuthCheck } = useApi();

    const logIn = async (data: UserLoginValues) => {
        try {
            const result = await fetchWithAuthCheck({
                method: 'POST',
                path: 'LOGIN',
                body: data,
            });
            if (!result.ok) {
                throw new Error(result.body.message);
            }

            return result;
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Error occurred during registration',
            );
        }
    };
    const logOut = async (logoutScope: 'thisDevice' | 'allDevices') => {
        try {
            await fetchWithAuthCheck({
                path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
                method: 'POST',
            });
        } catch (error) {
            toast.error(`Error occurred during logout`);
        }
    };
    const register = async (data: UserRegisterValues) => {
        try {
            const result = await fetchWithAuthCheck({
                method: 'POST',
                path: 'REGISTER',
                body: data,
            });
            if (!result.ok) {
                throw new Error(result.body.message);
            }

            return result;
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Error occurred during registration',
            );
        }
    };

    return { logIn, logOut, register };
};
