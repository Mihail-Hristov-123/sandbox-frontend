import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import type {
    AnswerReturnValues,
    AnswerValues,
} from '@/schemas/questions/AnswerSchema';

export const useCreateAnswer = (questionId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const createAnswer = async (
        data: AnswerValues,
    ): Promise<{ success: boolean }> => {
        const result = await fetchWithAuthCheck<AnswerReturnValues>({
            path: 'QUESTIONS',
            id: questionId,
            body: data,
            method: 'POST',
        });
        if (result?.ok) {
            toast.success('Answer posted!');
            return { success: true };
        }
        return { success: false };
    };

    return { createAnswer };
};
