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
        const ERROR_MESSAGE = 'Error occurred during question post';

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

            toast.error(responseData.message || ERROR_MESSAGE);
            return { success: false };
        } catch (error) {
            console.error(error);
            toast.error(ERROR_MESSAGE);
            return { success: false };
        }
    };

    return { createQuestion };
};
