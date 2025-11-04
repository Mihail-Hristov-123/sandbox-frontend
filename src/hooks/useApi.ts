import { apiRoutes } from '../Routes';
import { useAuthContext } from '../contexts/auth/useAuthContext';

type Path = keyof typeof apiRoutes;
export interface FetchParams {
    path: Path;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
}

interface ResponseBody<Data> {
    success: boolean;
    message?: string;
    data?: Data;
}

export interface Response<Data> {
    status: number;
    ok: boolean;
    body?: ResponseBody<Data>;
}

export const useApi = () => {
    const { setIsLoggedIn } = useAuthContext();

    const fetchWithAuthCheck = async <Data>({
        path,
        method = 'GET',
        body,
    }: FetchParams): Promise<Response<Data> | undefined> => {
        const response = await fetch(`/@api${apiRoutes[path]}`, {
            method,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status === 401 && path !== 'LOGIN') {
            setIsLoggedIn(false);
            return;
        }

        const responseBody = await response.json();

        return {
            status: response.status,
            ok: response.ok,
            body: responseBody,
        };
    };

    return { fetchWithAuthCheck };
};
