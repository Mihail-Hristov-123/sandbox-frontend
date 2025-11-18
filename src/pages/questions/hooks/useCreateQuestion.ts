import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import type { QuestionValues } from '@/schemas/questions/QuestionSchema';
import { createApiRoute } from '@/utils/createApiRoute';
import { SERVER_ROUTES } from '@/routes';

export const useCreateQuestion = (refreshQuestions: () => Promise<void>) => {
    const { fetchWithAuthCheck } = useApi();

    const createQuestion = async (
        data: QuestionValues,
    ): Promise<{ success: boolean }> => {
        try {
            const response = await fetchWithAuthCheck(
                createApiRoute(SERVER_ROUTES.QUESTIONS),
                {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.ok) {
                toast.success('Question published!');
                await refreshQuestions();

                return { success: true };
            }
            const responseData = await response.json();

            toast.error(responseData.message);
            return { success: false };
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during question post');
            return { success: false };
        }
    };

    return { createQuestion };
};
