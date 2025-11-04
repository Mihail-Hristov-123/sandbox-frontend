import { useAuthContext } from '../contexts/auth/useAuthContext';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';
import { displayErrorToast } from '../utils/displayErrorToast';
import { useApi } from './useApi';

export const useAuthService = () => {
    const { fetchWithAuthCheck } = useApi();
    const { setIsLoggedIn } = useAuthContext();

    const logIn = async (data: UserLoginValues) => {
        try {
            const result = await fetchWithAuthCheck({
                method: 'POST',
                path: 'LOGIN',
                body: data,
            });
            if (result && !result.ok) {
                throw new Error(result.body?.message);
            }

            setIsLoggedIn(true);

            return result;
        } catch (error) {
            displayErrorToast(error, 'Error occurred during login');
        }
    };
    const logOut = async (logoutScope: 'thisDevice' | 'allDevices') => {
        try {
            await fetchWithAuthCheck({
                path: logoutScope === 'thisDevice' ? 'LOGOUT' : 'LOGOUT_ALL',
                method: 'POST',
            });
            setIsLoggedIn(false);
        } catch (error) {
            displayErrorToast(error, 'Error occurred during logout');
        }
    };
    const register = async (data: UserRegisterValues) => {
        try {
            const result = await fetchWithAuthCheck({
                method: 'POST',
                path: 'REGISTER',
                body: data,
            });
            if (result && !result.ok) {
                throw new Error(result.body?.message);
            }

            setIsLoggedIn(true);

            return result;
        } catch (error) {
            displayErrorToast(error, 'Error occurred during registration');
        }
    };

    return { logIn, logOut, register };
};
