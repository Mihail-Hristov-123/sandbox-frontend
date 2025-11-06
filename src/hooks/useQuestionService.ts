import toast from 'react-hot-toast';
import type { QuestionValues } from '../schemas/questions/QuestionSchema';
import { useApi } from './useApi';

export const useQuestionService = () => {
    const { fetchWithAuthCheck } = useApi();

    const createQuestion = async (
        data: QuestionValues,
        resetForm: () => void,
    ) => {
        const result = await fetchWithAuthCheck({
            method: 'POST',
            body: data,
            path: 'QUESTIONS',
        });
        if (result.ok) {
            toast.success('Question published!');
            resetForm();
            return;
        }
        toast.error(result.body.message);
    };

    return { createQuestion };
};
