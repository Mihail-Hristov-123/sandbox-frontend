import { createApiRoute } from '@/utils/createApiRoute';

import { useApi } from './useApi';
import { SERVER_ROUTES } from '@/routes';

export const useUserService = () => {
    const { fetchWithAuthCheck } = useApi();

    const getCurrentUserInfo = () =>
        fetchWithAuthCheck(createApiRoute(SERVER_ROUTES.ME));

    return { getCurrentUserInfo };
};
