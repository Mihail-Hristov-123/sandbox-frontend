import { apiRoutes } from '../routes';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { useLoadingContext } from '../contexts/loading/useLoadingContext';
import toast from 'react-hot-toast';

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
    const { setIsLoading } = useLoadingContext();
    const fetchWithAuthCheck = async <Data>({
        path,
        method = 'GET',
        body,
    }: FetchParams): Promise<Response<Data> | void> => {
        setIsLoading(true);
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

            if (!response.ok) {
                toast.error(responseBody.message);
            }

            return {
                status: response.status,
                ok: response.ok,
                body: responseBody,
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
