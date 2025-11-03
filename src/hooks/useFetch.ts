import { useAuthContext } from '../contexts/auth/useAuthContext';
import { apiRoutes } from '../routes';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const PROXY_ALIAS = '/@api';

export const useFetch = () => {
    const { refresh } = useAuthContext();

    const fetchOrLogout = async (
        path: keyof typeof apiRoutes,
        method?: HttpMethod,
        body?: unknown,
    ) => {
        const result = await fetch(`${PROXY_ALIAS}/${apiRoutes[path]}`, {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (result.status === 401) {
            await refresh();
        }
        return result;
    };

    return { fetchOrLogout };
};
