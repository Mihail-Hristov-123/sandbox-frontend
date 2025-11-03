import type { UserReturnValues } from '../schemas/auth/RegisterSchema';

import { useApi } from './useApi';

export const useUserService = () => {
    const { makeApiRequest } = useApi();

    const getCurrentUserInfo = async () => {
        const result = await makeApiRequest<UserReturnValues>({ path: 'ME' });

        return result;
    };

    return { getCurrentUserInfo };
};
