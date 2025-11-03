import { useAuthContext } from '../contexts/auth/useAuthContext';
import { apiRoutes } from '../routes';
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions {
    path: keyof typeof apiRoutes;
    method?: Method;
    body?: unknown;
}

type Path = keyof typeof apiRoutes;
export type Response<T> = {
    ok: boolean;
    status: number;
    body: {
        success: boolean;
        message: string;
        data: T | null;
    } | null;
};

export const useApi = () => {
    const { refresh } = useAuthContext();

    const authPaths: Partial<Path>[] = [
        'REGISTER',
        'LOGIN',
        'LOGOUT',
        'LOGOUT_ALL',
    ];
    const handleDynamicAuth = async <T>(path: Path, response: Response<T>) => {
        if (authPaths.includes(path) && response.ok) {
            await refresh();
        }

        if (!authPaths.includes(path) && response.status === 401) {
            await refresh();
        }
    };

    const makeApiRequest = async <T>({
        path,
        body,
        method = 'GET',
    }: FetchOptions): Promise<Response<T>> => {
        const options: RequestInit = {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        };
        let result: Response<T> = {
            ok: false,
            status: 0,
            body: null,
        };
        try {
            const response = await fetch(`/@api${apiRoutes[path]}`, options);
            let body: {
                success: boolean;
                message: string;
                data: T | null;
            } | null = null;
            try {
                body = await response.json();
            } catch {}
            result = {
                ok: response.ok,
                status: response.status,
                body,
            };

            await handleDynamicAuth(path, result);
        } catch (err) {
            console.error('API request failed', err);
        } finally {
            return result;
        }
    };

    return { makeApiRequest };
};
