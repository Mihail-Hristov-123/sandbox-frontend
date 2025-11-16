import toast from 'react-hot-toast';
import { SERVER_ROUTES } from '../routes';
import type {
    AnswerReturnValues,
    AnswerValues,
} from '../schemas/questions/CommentSchema';

import { useApi } from './useApi';

const getDynamicQuestionPath = (questionId: number | string) =>
    `${SERVER_ROUTES.QUESTIONS}/${questionId}`;

export const useCreateAnswer = (questionId: number) => {
    const { fetchWithAuthCheck } = useApi();

    const createAnswer = async (
        data: AnswerValues,
    ): Promise<{ success: boolean }> => {
        const result = await fetchWithAuthCheck<AnswerReturnValues>({
            path: getDynamicQuestionPath(questionId),
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
