import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import type { AnswerValues } from 'tacklebox-schemas';
import { createApiRoute } from '@/utils/createApiRoute';
import { SERVER_ROUTES } from '@/routes';

export const useCreateAnswer = (questionId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const createAnswer = async (
        data: AnswerValues,
    ): Promise<{ success: boolean }> => {
        try {
            const response = await fetchWithAuthCheck(
                createApiRoute(`${SERVER_ROUTES.QUESTIONS}/${questionId}`),
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            if (response.ok) {
                toast.success('Answer posted!');
                return { success: true };
            }
            const body = await response.json();
            toast.error(body.message);
            return { success: false };
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during answer creation');
            return { success: false };
        }
    };

    return { createAnswer };
};
