import { useAuthContext } from '../contexts/auth/useAuthContext';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const useFetch = () => {
    const { refresh } = useAuthContext();

    const fetchOrLogout = async (
        path: string,
        method?: HttpMethod,
        body?: unknown,
    ) => {
        const result = await fetch(`/@api/${path}`, {
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
