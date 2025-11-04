import type { UserReturnValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';

export const useUserService = () => {
    const { fetchWithAuthCheck } = useApi();

    const getCurrentUserInfo = async () => {
        const result = await fetchWithAuthCheck<UserReturnValues>({
            path: 'ME',
        });

        return result;
    };

    return { getCurrentUserInfo };
};
