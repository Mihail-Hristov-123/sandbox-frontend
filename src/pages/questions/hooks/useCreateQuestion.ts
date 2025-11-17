import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import type { QuestionValues } from '@/schemas/questions/QuestionSchema';

export const useCreateQuestion = (refreshQuestions: () => Promise<void>) => {
    const { fetchWithAuthCheck } = useApi();

    const createQuestion = async (
        data: QuestionValues,
    ): Promise<{ success: boolean }> => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            body: data,
            path: 'QUESTIONS',
        });
        if (result?.ok) {
            toast.success('Question published!');
            await refreshQuestions();
            return { success: true };
        }
        return { success: false };
    };

    return { createQuestion };
};
