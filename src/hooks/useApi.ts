import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { apiRoutes } from '../routes';
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions {
    path: keyof typeof apiRoutes;
    method?: Method;
    body?: unknown;
}

type Path = keyof typeof apiRoutes;
type Response = {
    ok: boolean;
    status: number;
    data: { success: boolean; message: string } | null;
};

export const useApi = () => {
    const { refresh } = useAuthContext();

    const authPaths: Partial<Path>[] = [
        'REGISTER',
        'LOGIN',
        'LOGOUT',
        'LOGOUT_ALL',
    ];
    const handleDynamicAuth = async (path: Path, response: Response) => {
        if (authPaths.includes(path) && response.ok) {
            await refresh();
        }

        if (!authPaths.includes(path) && response.status === 401) {
            await refresh();
        }
    };

    const showErrorToast = (path: Path, response: Response) => {
        if (!authPaths.includes(path) && response.status === 401) {
            toast('Session expired, updating authentication status');
        } else if (!response.ok) {
            toast.error(
                response.data?.message
                    ? response.data.message
                    : 'Failed to connect to the server',
            );
        }
    };

    const makeApiRequest = async ({
        path,
        body,
        method = 'GET',
    }: FetchOptions) => {
        const options: RequestInit = {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        };
        let result = { ok: false, status: 0, data: null };
        try {
            const response = await fetch(`/@api${apiRoutes[path]}`, options);
            let data = null;

            try {
                data = await response.json();
            } catch {}

            result = { ok: response.ok, status: response.status, data };

            await handleDynamicAuth(path, result);
        } catch (err) {
            console.error('API request failed', err);
        } finally {
            showErrorToast(path, result);
            return result;
        }
    };

    return { makeApiRequest };
};
