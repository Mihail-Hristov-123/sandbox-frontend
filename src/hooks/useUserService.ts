import type { UserReturnValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';

export const useUserService = () => {
    const { fetchWithAuthCheck } = useApi();

    const getCurrentUserInfo = () =>
        fetchWithAuthCheck<UserReturnValues>({
            path: 'ME',
        });

    return { getCurrentUserInfo };
};
