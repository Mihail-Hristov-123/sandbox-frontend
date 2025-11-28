import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/Routes';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';

export const useDeleteAnswer = (answerId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const deleteAnswer = async () => {
        try {
            const response = await fetchWithAuthCheck(
                `${createApiRoute(SERVER_ROUTES.ANSWERS)}/${answerId}`,
                {
                    method: 'DELETE',
                },
            );
            if (response.ok) {
                toast.success('Answer deleted successfully');
                return;
            }

            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during answer deletion');
        }
    };

    return { deleteAnswer };
};
