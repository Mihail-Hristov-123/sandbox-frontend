import { useState } from 'react';
import { useApi } from './useApi';
import { apiRoutes } from '../routes';
import type {
    AnswerReturnValues,
    AnswerValues,
} from '../schemas/questions/CommentSchema';
import toast from 'react-hot-toast';

export interface DetailedQuestionInfo {
    questionData: {
        user_username: string;
        user_id: number;
        description: string;
        title: string;
    };
    answersData: {
        question_id: number;
        id: number;
        content: string;
        user_id: number;
        user_username: string;
    }[];
}

export const useQuestionDetails = () => {
    const { fetchWithAuthCheck } = useApi();

    const [currentQuestionData, setCurrentQuestionData] =
        useState<DetailedQuestionInfo | null>(null);

    const updateCurrentQuestionData = async (questionId: unknown) => {
        if (
            !questionId ||
            isNaN(Number(questionId)) ||
            Number(questionId) <= 0
        ) {
            setCurrentQuestionData(null);

            return;
        }

        const response = await fetchWithAuthCheck<DetailedQuestionInfo>({
            path: `${apiRoutes.QUESTIONS}/${questionId}`,
        });

        setCurrentQuestionData(response?.data ?? null);
    };

    const createAnswer = async (
        data: AnswerValues,
        questionId: unknown,
        onSuccess: () => void,
    ) => {
        const result = await fetchWithAuthCheck<AnswerReturnValues>({
            path: `questions/${questionId}`,
            body: data,
            method: 'POST',
        });
        if (result?.ok) {
            await updateCurrentQuestionData(questionId);
            toast.success('Answer posted!');
            onSuccess();
        }
    };

    return { currentQuestionData, updateCurrentQuestionData, createAnswer };
};
