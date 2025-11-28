import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/Routes';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';

export const useDeleteCatch = (catchId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const deleteCatch = async () => {
        try {
            const response = await fetchWithAuthCheck(
                `${createApiRoute(SERVER_ROUTES.CATCHES)}/${catchId}`,
                {
                    method: 'DELETE',
                    body: JSON.stringify({ catchId }),
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.ok) {
                toast.success('Catch deleted successfully');
                return;
            }

            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during catch deletion');
        }
    };

    return { deleteCatch };
};
