import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useApi } from '@/hooks/useApi';
import { CLIENT_ROUTES, SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useNavigate } from 'react-router';

export const useLikeCatch = (catchId: number) => {
    const { fetchWithAuthCheck } = useApi();
    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    const likeOrDislike = async () => {
        if (!isLoggedIn) {
            navigate(CLIENT_ROUTES.LOG_IN);
            return;
        }
        await fetchWithAuthCheck(
            `${createApiRoute(SERVER_ROUTES.LIKES)}/catches/${catchId}`,
            { method: 'POST' },
        );
    };

    return { likeOrDislike };
};
