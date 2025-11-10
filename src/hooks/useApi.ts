import { apiRoutes } from '../routes';
import { useAuthContext } from '../contexts/auth/useAuthContext';

import toast from 'react-hot-toast';

type Path = keyof typeof apiRoutes;
export interface FetchParams {
    path: Path | string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    silent?: boolean;
}

export interface Response<ExpectedResponseBody> {
    message: string;
    ok: boolean;
    data?: ExpectedResponseBody;
}

export const useApi = () => {
    const { setIsLoggedIn } = useAuthContext();

    const fetchWithAuthCheck = async <Data>({
        path,
        method = 'GET',
        body,
        silent = false,
    }: FetchParams): Promise<Response<Data> | void> => {
        try {
            const response = await fetch(
                `/@api${path in apiRoutes ? apiRoutes[path as keyof typeof apiRoutes] : path}`,
                {
                    method,
                    headers: body
                        ? { 'Content-Type': 'application/json' }
                        : undefined,
                    body: body ? JSON.stringify(body) : undefined,
                },
            );

            if (response.status === 401) {
                setIsLoggedIn(false);
            }

            const responseBody = await response.json();

            if (!response.ok && !silent) {
                toast.error(responseBody.message);
            }

            return {
                ok: response.ok,
                message: responseBody.message,
                data: responseBody.data,
            };
        } catch (error) {
            console.error(`Error occurred during API fetch: ${error}`);
            toast.error('Failed to connect to the server');
        }
    };

    return { fetchWithAuthCheck };
};
