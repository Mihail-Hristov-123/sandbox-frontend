import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/Routes';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';

export const useDeleteQuestion = (questionId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const deleteQuestion = async () => {
        try {
            const response = await fetchWithAuthCheck(
                `${createApiRoute(SERVER_ROUTES.QUESTIONS)}/${questionId}`,
                {
                    method: 'DELETE',
                },
            );
            if (response.ok) {
                toast.success('Question deleted successfully');
                return;
            }

            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during question deletion');
        }
    };

    return { deleteQuestion };
};
