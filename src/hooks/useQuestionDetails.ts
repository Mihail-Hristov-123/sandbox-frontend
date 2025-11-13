import { useState } from 'react';
import { useApi } from './useApi';
import { SERVER_ROUTES } from '../routes';
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

const getDynamicQuestionPath = (questionId: number | string) =>
    `${SERVER_ROUTES.QUESTIONS}/${questionId}`;

export const useQuestionDetails = () => {
    const { fetchWithAuthCheck } = useApi();

    const [currentQuestionData, setCurrentQuestionData] =
        useState<DetailedQuestionInfo | null>(null);

    const updateCurrentQuestionData = async (questionId: unknown) => {
        if (isNaN(Number(questionId)) || Number(questionId) <= 0) {
            setCurrentQuestionData(null);

            return;
        }

        const response = await fetchWithAuthCheck<DetailedQuestionInfo>({
            path: getDynamicQuestionPath(questionId as number),
        });

        setCurrentQuestionData(response?.data ?? null);
    };

    const createAnswer = async (
        data: AnswerValues,
        questionId: number,
        onSuccess: () => void,
    ) => {
        const result = await fetchWithAuthCheck<AnswerReturnValues>({
            path: getDynamicQuestionPath(questionId),
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
