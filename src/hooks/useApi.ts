import { useAuthContext } from '../contexts/auth/useAuthContext';

import toast from 'react-hot-toast';
import { useLoadingContext } from '../contexts/loading/useLoadingContext';
import { SERVER_ROUTES, type ServerRoute } from '../routes';
import { isServerPath } from '../utils/typeGuards/isServerPath';

export interface FetchParams {
    path: ServerRoute | string;
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
    const { setIsLoading } = useLoadingContext();
    const fetchWithAuthCheck = async <Data>({
        path,
        method = 'GET',
        body,
        silent = false,
    }: FetchParams): Promise<Response<Data> | void> => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/@api${isServerPath(path) ? SERVER_ROUTES[path] : path}`,
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
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchWithAuthCheck };
};
