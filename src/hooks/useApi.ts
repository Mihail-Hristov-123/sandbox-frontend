import { apiRoutes } from '../routes';
import { useAuthContext } from '../contexts/auth/useAuthContext';

type Path = keyof typeof apiRoutes;
export interface FetchParams {
    path: Path;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
}

export interface Response<ExpectedResponseBody> {
    status: number;
    ok: boolean;
    body: {
        success: boolean;
        message: string;
        data?: ExpectedResponseBody;
    };
}

export const useApi = () => {
    const { setIsLoggedIn } = useAuthContext();

    const fetchWithAuthCheck = async <Data>({
        path,
        method = 'GET',
        body,
    }: FetchParams): Promise<Response<Data>> => {
        try {
            const response = await fetch(`/@api${apiRoutes[path]}`, {
                method,
                headers: body
                    ? { 'Content-Type': 'application/json' }
                    : undefined,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (response.status === 401) {
                setIsLoggedIn(false);
            }

            const responseBody = await response.json();

            return {
                status: response.status,
                ok: response.ok,
                body: responseBody,
            };
        } catch (error) {
            console.error(`Error occurred during API fetch: ${error}`);
            return {
                status: 0,
                ok: false,
                body: {
                    success: false,
                    message: 'Failed to fetch',
                },
            };
        }
    };

    return { fetchWithAuthCheck };
};
