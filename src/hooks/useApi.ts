import { useAuthContext } from '../contexts/auth/useAuthContext';

type FetchParams = Parameters<typeof fetch>;

export const useApi = () => {
    const { setIsLoggedIn } = useAuthContext();

    const fetchWithAuthCheck = async (
        path: FetchParams[0],
        options?: FetchParams[1],
    ) => {
        const response = await fetch(path, options);
        if (response.status === 401) {
            setIsLoggedIn(false);
        }
        return response;
    };

    return { fetchWithAuthCheck };
};
